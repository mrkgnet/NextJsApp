//logout function 

export default async function logout(req, res) {
    try {
        res.setHeader('Set-Cookie', 'token=; Path=/; HttpOnly; Max-Age=0; sameSite=Lax')
        return res.status(200).json({ message: 'Logout successful' })
    } catch (error) {
        return res.status(500).json({ message: 'Logout failed', error: error.message })
    }
}