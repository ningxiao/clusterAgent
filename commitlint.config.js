module.exports = {
    parserPreset: 'conventional-changelog-conventionalcommits',
    rules: {
        'body-leading-blank': [1, 'always'],
        'body-max-line-length': [2, 'always', 150],
        'footer-leading-blank': [1, 'always'],
        'footer-max-line-length': [2, 'always', 150],
        'header-max-length': [2, 'always', 150],
        'subject-case': [2, 'never', ['sentence-case', 'start-case', 'pascal-case', 'upper-case']],
        'subject-empty': [2, 'never'],
        'subject-full-stop': [2, 'never', '.'],
        'type-case': [2, 'always', 'lower-case'],
        'type-empty': [2, 'never'],
        'type-enum': [2, 'always', ['feat', 'fix', 'chore', 'docs', 'refactor', 'perf', 'release']],
        'ones-link': [0, 'always'],
        'lerna-empty': [2, 'always'],
    },
    prompt: {
        questions: {
            type: {
                description: "Select the type of change that you're committing:",
                enum: {
                    feat: {
                        description: 'A new feature',
                        title: 'Features',
                        emoji: '✨',
                    },
                    fix: {
                        description: 'A bug fix',
                        title: 'Bug Fixes',
                        emoji: '🐛',
                    },
                    docs: {
                        description: 'Documentation only changes',
                        title: 'Documentation',
                        emoji: '📚',
                    },
                    refactor: {
                        description: 'A code change that neither fixes a bug nor adds a feature',
                        title: 'Code Refactoring',
                        emoji: '📦',
                    },
                    perf: {
                        description: 'A code change that improves performance',
                        title: 'Performance Improvements',
                        emoji: '🚀',
                    },
                    release: {
                        description: 'Release new Version',
                        title: 'Release',
                        emoji: '🛠',
                    },
                    chore: {
                        description: "Other changes that don't modify src or test files",
                        title: 'Chores',
                        emoji: '♻️',
                    },
                },
            },
            scope: {
                description: 'What is the scope of this change (e.g. component or file name)',
            },
            subject: {
                description: 'Write a short, imperative tense description of the change',
            },
            body: {
                description: 'Provide a longer description of the change',
            },
            isBreaking: {
                description: 'Are there any breaking changes?',
            },
            breakingBody: {
                description:
                    'A BREAKING CHANGE commit requires a body. Please enter a longer description of the commit itself',
            },
            breaking: {
                description: 'Describe the breaking changes',
            },
            isIssueAffected: {
                description: 'Does this change affect any open issues?',
            },
            issuesBody: {
                description:
                    'If issues are closed, the commit requires a body. Please enter a longer description of the commit itself',
            },
            issues: {
                description: 'Add issue references (e.g. "fix #123", "re #123".)',
            },
        },
    },
    plugins: [
        {
            rules: {
                'ones-link': ({ subject }) => {
                    return [
                        /^(ones:)((http|https)(:\/\/)(ones\.sankuai\.com\/).).*/g.test(subject),
                        `请在提交标题上关联Ones链接 (格式：ones:{link}+空格+标题)`,
                    ];
                },
                'lerna-empty': ({ subject }) => {
                    return [/(【).\w\S*?(】)/g.test(subject), `请选择一个项目进行提交`];
                }
            },
        },
    ],
};
