module.exports = Object.freeze({
    CORS_CLIENT_URLS: ['http://192.168.68.139:3000', 'http://localhost:3000'],
    SESSION_DURATION_MAX: 4 * 3600 * 1000, // 4 hours
    SESSION_CODE_LENGTH: 6,
    SESSION_CLEANUP_INTERVAL: 15 * 1000 * 1000 // 15 minutes
})
