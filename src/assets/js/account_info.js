export function StoreCsrfToken(token) {
    localStorage.setItem('web_chat_csrf_token', token);
}

export function GetCsrfToken() {
    return localStorage.getItem('web_chat_csrf_token') || '';
}

export async function LoginFetch(username, password) {
    const response = await fetch('/api/v1/account/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            username: username,
            password: password
        })
    })
    if (!response.ok) {
        if (response.status === 429) {
            throw new Error('请求过于频繁，稍后再重试')
        }
        if (response.status === 403) {
            throw new Error('请求异常，请一小时后重试')
        }
        throw new Error('网络异常，请重试');
    }

    const csrfToken = response.headers.get('X-Csrf-Token');
    if (csrfToken) {
        StoreCsrfToken(csrfToken)
    }

    return await response.json()
}

export async function LogoutFetch() {
    try {
        const response = await fetch('/api/v1/account/logout', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'X-Csrf-Token': GetCsrfToken(),
            }
        })
        if (!response.ok) {
            if (response.status === 401) {
                return true
            }
            if (response.status === 429) {
                throw new Error('请求过于频繁，稍后再重试')
            }
            throw new Error('网络异常，请重试');
        }
        const body = await response.json();
        return body.success
    } catch (error) {
        alert(error.message)
        return false
    }
}

export async function GetAccountInfoFetch() {
    const csrfToken = GetCsrfToken()
    if (csrfToken === '') {
        // 未登录，没有token
        return null
    }

    const response = await fetch('/api/v1/account/info', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'X-Csrf-Token': csrfToken,
        }
    })
    if (!response.ok) {
        if (response.status === 401) {
            // 未登录
            return null;
        }

        throw new Error('网络异常，请刷新页面');
    }

    return await response.json()
}