/*
document structure:
{
	id: <id>,
	fields: {
		<key1>: <value1>,
		<key2>: <value2>,
		...
		<keyn>: <valuen>
	}
}

example:

{
	id: 3,
	fields: {
		title: "Title of the article",
		body: "foo foo foo foo",
		author: "jack gordon"
	}
}

documents = [<document1>, <document2>, ... <documentN>]

*/

var documentFilter = function(documents) {

}



documentFilter.prototype.filter = function(query) {

}

/* result structure:

[<document1>, ... <documentn>]

document structure:

{
	id: <id>,
	fields: {
		<key1>: [<segment1>, <segment2>, ... <segmentN>],
		...
	}
}

segment: {
	begin: <begin index>,
	end: <end index>
}

*/