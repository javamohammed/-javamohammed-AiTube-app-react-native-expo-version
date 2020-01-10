import * as SQLite from 'expo-sqlite';
const db = SQLite.openDatabase('videos.db')

export const init = () => {
    const promise = new Promise((resolve, reject) => {
        db.transaction(tx => { //linkVideo, idVid, title, description, publishedAt,  idUser
            tx.executeSql(`CREATE TABLE IF NOT EXISTS 
                            videos(
                                id INTEGER PRIMARY KEY NOT NULL,
                                link TEXT NOT NULL,
                                id_video  TEXT NOT NULL,
                                title TEXT NOT NULL,
                                description TEXT NOT NULL,
                                published_at TEXT NOT NULL,
                                user_id TEXT NOT NULL )
                                `)
        },
        [],
        () => {
            resolve()
        },
        (_, err) => {
            reject(err)
        })
    })
    return promise
}

export const insertVideo = (link, id_video, title, description, published_at, user_id) => {
    const promise = new Promise((resolve, reject) => {
        db.transaction(tx => {
            tx.executeSql(
                `INSERT INTO videos (link, id_video, title, description, published_at,user_id)
                             VALUES (?, ?, ?, ?, ?, ?);`,
                [link, id_video, title, description, published_at, user_id],
                (_, result) => {
                    resolve(result);
                },
                (_, err) => {
                    reject(err);
                }
            );
        });
    });
    return promise;
};
export const deleteVideo = (id, user_id) => {
    const promise = new Promise((resolve, reject) => {
        db.transaction(tx => {
            tx.executeSql(
                `DELETE FROM videos where user_id=? and id=?`,
                [user_id, id],
                (_, result) => {
                    resolve(result);
                },
                (_, err) => {
                    reject(err);
                }
            );
        });
    });
    return promise;
};
export const updateVideo = (id,title, user_id) => {
    const promise = new Promise((resolve, reject) => {
        db.transaction(tx => {
            tx.executeSql(
                `UPDATE videos SET title=? where user_id=? and id=?`,
                [title, user_id, id],
                (_, result) => {
                    resolve(result);
                },
                (_, err) => {
                    reject(err);
                }
            );
        });
    });
    return promise;
};
export const fetchVideos = (user_id) => {
    let request = 'SELECT * FROM videos WHERE user_id=?'
    let Params = [user_id]
    if(user_id === ''){
        Params =[]
        request = 'SELECT * FROM videos LIMIT 10'
    }
    const promise = new Promise((resolve, reject) => {
        db.transaction(tx => {
            tx.executeSql(
                request,
                Params,
                (_, result) => {
                    resolve(result);
                },
                (_, err) => {
                    reject(err);
                }
            );
        });
    });
    return promise;
};