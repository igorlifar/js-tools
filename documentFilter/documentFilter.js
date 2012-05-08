
var documentFilter = function(documents){
	this.documents = documents;
};

var cmpE = function(a, b){
	if(a.x != b.x){
		return parseInt(a.x) < parseInt(b.x);
	}
	return parseInt(a.t) < parseInt(b.t);
};

var sort = function(events, l, r){
	l = parseInt(l);
	r = parseInt(r);
	if(l >= r){
		return;
	}
	var mid = Math.floor((l + r) / 2);
	sort(events, l, mid);
	sort(events, mid + 1, r);
	var k = 0;
	var e = new Array();
	var i = l;
	var j = mid + 1;
	while(i <= mid && j <= r){
		if(cmpE(events[i], events[j])){
			e[k++] = events[i++];
		}
		else{
			e[k++] = events[j++];
		}
	}
	while(i <= mid){
		e[k++] = events[i++];
	}
	while(j <= r){
		e[k++] = events[j++];
	}
	for(var i = l; i <= r; i++){
		events[i] = e[i - l];
	}
}

documentFilter.prototype.filter = function(query){
	var words = new Array();
	var currentString = "";
	query += " ";
	var size = 0;
	for(var i = 0; i < query.length; i++){
		if(query[i] == " "){
			if(currentString.length > 0){
				words[size++] = currentString.toUpperCase();
			}
			currentString = "";
		}
		else{
			currentString += query[i];
		}
	}
	var size = 0;
	var documents = new Array();
	for(var i = 0; i < this.documents.length; i++){
		var fields = {};
		var good = false;
		for(key in this.documents[i].fields){
			var k = 0;
			var events = new Array();
			for(var j = 0; j < words.length; j++){
				var start = this.documents[i].fields[key].toUpperCase().indexOf(words[j]);
				if(start != -1){
					events[k++] = {"x" : start, "t" : 1};
					events[k++] = {"x" : start + words[j].length - 1, "t" : 2};
				}
			}
			if(k == 0){
				continue;
			}
			sort(events, 0, k - 1);
			var n = 0;
			var currentSegments = new Array();
			var lastx = -1;
			var balance = 0;
			for(var j = 0; j < k; j++){
				if(events[j].t == 1){
					if(balance == 0){
						lastx = events[j].x;
					}
					balance++;
				}
				else{
					balance--;
					if(balance == 0){
						currentSegments[n++] = {"begin" : lastx, "end" : events[j].x};
					}
				}
			}
			var m = 0;
			var segments = new Array();
			var j = 0;
			while(j < currentSegments.length){
				var z = j;
				while(z + 1 < currentSegments.length && currentSegments[z].end + 1 == currentSegments[z + 1].begin){
					z++;
				}
				segments[m++] = {"begin" : currentSegments[j].begin, "end" : currentSegments[z].end};
				j = z + 1;
			}
			fields[key] = segments;
			good = true;
		}
		if(good){
			documents[size++] = {"id" : this.documents[i].id, "fields" : fields};
		}
	}
	return documents;
};
