export default class Login_service {

    static loginUser(userName, password, resoleveLogin, rejectLogin, handlerError) {
        return new Promise((resolve, reject) => {
        setTimeout(() => {
                fetch('http://192.168.43.236:3000/posts', {
                    method: 'post',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        name: "sam",
                        password: "sam"
                    })
                }).then((res) => {
                        res.json().then(resJson => {
                            if (res.status === 401) {
                                rejectLogin(resJson);
                            } else if (res.status === 201) {
                                resoleveLogin(resJson)
                                resolve()
                            } else {
                                handlerError(resJson);
                            }
                        });
                    }
                ).catch((error) => {
                    handlerError(error);
                });

        }, 2000);
        });
    }
}