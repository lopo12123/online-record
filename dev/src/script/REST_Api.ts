import axios from "axios";
import { Buffer } from "buffer";
import { userName, repoName, token } from "../../public/manifest.json";

// region [GET] /repos/{owner}/{repo}/branches/{branch}
/**
 * @description details of branch <br/>
 * @description `[GET] /repos/{owner}/{repo}/branches/{branch}`
 * [doc]{@link https://docs.github.com/en/rest/reference/branches#get-a-branch}
 */
interface BranchDetail {
    "name": string
    "commit": {
        "sha": string
        "node_id": string
        "commit": {
            "author": {
                "name": string
                "email": string
                "date": string
            }
            "committer": {
                "name": string
                "email": string
                "date": string
            }
            "message": string
            "tree": {
                "sha": string
                "url": string
            }
            "url": string
            "comment_count": number
            "verification": {
                "verified": boolean
                "reason": string
                "signature": null
                "payload": null
            }
        }
        "url": string
        "html_url": string
        "comments_url": string
        "author": null
        "committer": null
        "parents": {
            "sha": string
            "url": string
            "html_url": string
        }[]
    }
    "_links": {
        "self": string
        "html": string
    }
    "protected": boolean
    "protection": {
        "enabled": boolean
        "required_status_checks": {
            "enforcement_level": "on" | "off"
            "contexts": string[]
            "checks": string[]
        }
    }
    "protection_url": string
}
// endregion

// region [GET] /repos/{owner}/{repo}/git/blobs/{file_sha}
/**
 * @description the content in the response will always be Base64 encoded <br/>
 * @description `[GET] /repos/{owner}/{repo}/git/blobs/{file_sha}`
 * [doc]{@link https://docs.github.com/en/rest/reference/git#get-a-blob}
 */
interface FileInfo {
    content: string
    encoding: 'base64'
    node_id: string
    sha: string
    size: number
    url: string
}
// endregion

// region [GET] /repos/{username}/{repo}/git/trees/{tree_sha}
/**
 * @description `[GET] /repos/{username}/{repo}/git/trees/{tree_sha}` <br/>
 * @description returns a single tree using the SHA1 value for that tree
 * [doc]{@link https://docs.github.com/en/rest/reference/git#get-a-tree}
 */
interface TreeInfo {
    "sha": string
    "url": string
    "tree": {
        "path": string
        "mode": string
        "type": string  // blob
        "sha": string
        "size": number
        "url": string
    }[]
    "truncated": boolean
}
// endregion

const AxiosConfig = {
    baseURL: "https://api.github.com",
    headers: {
        "Content-Type": "application/json",
        "Accept": "application/vnd.github.v3.full+json",
        "Authorization": `Bearer ${token}`
    }
}
const _GET = (url: string): Promise<any> => {
    return new Promise((resolve, reject) => {
        axios.get(url, AxiosConfig)
            .then(({data}) => {
                resolve(data)
            })
            .catch((err) => {
                reject(err)
            })
    })
}
const _PUT = (url: string, body: any): Promise<any> => {
    return new Promise((resolve, reject) => {
        axios.put(url, body, AxiosConfig)
            .then(({data}) => {
                resolve(data)
            })
            .catch((err) => {
                reject(err)
            })
    })
}
const _Base64 = (ori: string | Buffer, type: 'encode' | 'decode') => {
    if(type === 'encode') {
        return Buffer.from(ori).toString('base64')
    }
    else {
        return Buffer.from(ori as string, 'base64')
    }
}

/**
 * @description get target file
 */
const getTargetFileJson = (fileName: string): Promise<{ fileJson: string, fileSha: string }> => {
    let fileSha: string

    return _GET(`/repos/${userName}/${repoName}/branches/master`)
        .then((branch_detail: BranchDetail) => {
            return _GET(`repos/${userName}/${repoName}/git/trees/${branch_detail.commit.commit.tree.sha}`)
        })
        .then(({ tree }: TreeInfo) => {
            for(let i = 0; i < tree.length; i ++) {
                if(tree[i].path === fileName) {
                    fileSha = tree[i].sha
                    return _GET(`/repos/${userName}/${repoName}/git/blobs/${tree[i].sha}`)
                }
            }
            throw new Error('ENotFound')
        })
        .then(({ content }: FileInfo) => {
            return Promise.resolve({
                fileJson: _Base64(content, 'decode').toString(),
                fileSha: fileSha
            })
        })
}
/**
 * @description set target file
 */
const setTargetFileJson = (fileName: string, fileSha: string, fileJson: string) => {
    const body = {
        message: '',
        content: _Base64(fileJson, 'encode').toString(),
        sha: fileSha
    }
    return _PUT(`/repos/${userName}/${repoName}/contents/${fileName}`, body)
}

export {
    getTargetFileJson,
    setTargetFileJson
}
