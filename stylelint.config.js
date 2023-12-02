module.exports = {
	extends: ["stylelint-config-standard"],
	rules: {
		"at-rule-no-unknown": [
			true,
			{
				ignoreAtRules: [
					"tailwind",
					"apply",
					"responsive",
					"variants",
					"screen",
				],
			},
		],
		"declaration-block-trailing-semicolon": null,
		"no-descending-specificity": null,
		"selector-class-pattern": [
			"^([a-z][a-z0-9]*)(?:\\:)?(-[a-z0-9]+)*",
			{
				message: (selector) => `Expected class selector "${selector}" to be written in lower kebab-case, with an optional 'category:'`,
			},
		]
	}
};