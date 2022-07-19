module.exports = {
    disableEmoji: true,
    format: '{type}{scope}: 【{lerna}】{subject}',
    list: ['feat', 'fix', 'chore', 'docs', 'refactor', 'perf', 'release'],
    maxMessageLength: 150,
    minMessageLength: 3,
    questions: ['type', 'scope', 'subject', 'body', 'lerna'],
    scopes: ['Other', 'Component', 'Api', 'Views', 'Config', 'Store', 'Router', 'Style', 'Utils'],
    types: {
        chore: {
            description: '其他修改',
            emoji: '🤖',
            value: 'chore',
        },
        docs: {
            description: '修改文档',
            emoji: '✏️',
            value: 'docs',
        },
        feat: {
            description: '新功能',
            emoji: '🎸',
            value: 'feat',
        },
        fix: {
            description: 'Bug 修复',
            emoji: '🐛',
            value: 'fix',
        },
        perf: {
            description: '性能优化',
            emoji: '⚡️',
            value: 'perf',
        },
        refactor: {
            description: '代码重构',
            emoji: '💡',
            value: 'refactor',
        },
        release: {
            description: '新版发布',
            emoji: '🏹',
            value: 'release',
        },
    },
};
