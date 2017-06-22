


function Clozecard(text, cloze){
	this.text = text;
	this.cloze = cloze;
	this.partialtext = this.text.replace(cloze, "...")
}

module.exports = Clozecard;