export function slugify(text: string) {
	return text
		.toString()
		.toLowerCase()
		.replace(/\s+/g, '-')
		.replace(/[^\w-]+/g, '')
		.replace(/--+/g, '-')
		.replace(/^-+/, '')
		.replace(/-+$/, '')
}

export function desSlugify(text: string) {
	return text.replace(/-/g, ' ').replace(/(?:^|\s)\S/g, function (a) {
		return a.toUpperCase()
	})
}
