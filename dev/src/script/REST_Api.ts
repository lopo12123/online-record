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
        "Authorization": `Bearer ghp_${token}`
    }
}
const _GET = (url: string): Promise<any> => {
    return new Promise((resolve, reject) => {
        axios.get(url, {...AxiosConfig, params: { timestamp: Date.now() }})
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
                if(tree[i].path === fileName+'.json') {
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
const setTargetFileJson = (fileName: string, fileJson: string, fileSha?: string) => {
    const body: {
        message: string,
        content: string
        sha?: string
    } = {
        message: '',
        content: _Base64(fileJson, 'encode').toString()
    }
    if(fileSha) {
        body.sha = fileSha
    }
    return _PUT(`/repos/${userName}/${repoName}/contents/${fileName}.json`, body)
}

// region user manage
interface UserItem {
    account: string
    password: string
    token: string
}
const getAllUsers = (): Promise<UserItem[]> => {
    return getTargetFileJson('user')
        .then(({ fileJson }) => {
            return Promise.resolve(JSON.parse(fileJson))
        })
}
const addNewUser = (newUser: { account: string, password: string, token: string }) => {
    return getTargetFileJson('user')
        .then(({ fileJson, fileSha }) => {
            let userList: UserItem[] = JSON.parse(fileJson)

            let exist = userList.find((item) => {
                return (item.account === newUser.account) && (item.password === newUser.password)
            })
            if(!!exist) throw new Error('EConflict')

            userList.push(newUser)
            return setTargetFileJson('user', JSON.stringify(userList), fileSha)
        })
}
// endregion




interface CommentItem {
    date: string
    author: string
    comment: string
}
/**
 * @description add new comment
 * @param newItem
 */
const appendComment = (newItem: CommentItem) => {
    return getTargetFileJson('comment')
        .then(({fileJson, fileSha}) => {
            let list: CommentItem[] = JSON.parse(fileJson)
            list.push(newItem)
            return setTargetFileJson('comment.json', JSON.stringify(list), fileSha)
        })
}

export {
    getTargetFileJson,setTargetFileJson,

    getAllUsers, addNewUser,


    appendComment
}
