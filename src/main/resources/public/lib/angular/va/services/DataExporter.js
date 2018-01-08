
/**
 *  json data to csv file as force to download
 *  @param data  eg. [{name: 'Murat Duzgun', title: 'Engineer',address: {street: 'Kazim Karabekir'}}, {name: 'Bilge Oz',title: 'Sn. Engineer',address: {street: 'Hakan Karabekir'}}];
 *  @param extracted eg. ['name', 'title', 'address.street'];
 *  @param targetFilename target filename to save
 *  @param delim data delimiter (default is comma)
 */
function DataExporter(httpService) {
	return {
		toCSV: function (data, extracted, targetFilename, delim) {

			var resArr = [];
			if (!$$arrays.isArray(data) && $$objects.isObject(data)) {
				data = [].push(data);
			}

			if ($$arrays.isArray(data)) {

				for (var k in data) {
					var rowArr = [];
					for (var i in extracted) {
						rowArr.push(ObjectHelper.getByDotNotation(data[k], extracted[i]+''));
					}
					resArr.push(rowArr);
				}
			}

			var csvContent = "\uFEFF";
			resArr.forEach(function (infoArray, index) {
				dataString = infoArray.join(delim || ",");
				csvContent += index < data.length ? dataString + "\n" : dataString;
			});

			var strMimeType = 'text/csv';
			var strFileName = targetFilename ? targetFilename + '.csv' : 'csv.csv';

			var self = window, // this script is only for browsers anyway...
				u = "application/octet-stream", // this default mime also triggers iframe downloads
				m = strMimeType || u,
				x = csvContent,
				D = document,
				a = D.createElement("a"),
				z = function(a){return String(a);},
				B = (self.Blob || self.MozBlob || self.WebKitBlob || z);
			B=B.call ? B.bind(self) : Blob ;
			var fn = strFileName || "download",
				blob,
				fr;

			if(String(this)==="true"){ //reverse arguments, allowing download.bind(true, "text/xml", "export.xml") to act as a callback
				x=[x, m];
				m=x[0];
				x=x[1];
			}

			//go ahead and download dataURLs right away
			if(String(x).match(/^data\:[\w+\-]+\/[\w+\-]+[,;]/)){
				return navigator.msSaveBlob ?  // IE10 can't do a[download], only Blobs:
					navigator.msSaveBlob(d2b(x), fn) :
					saver(x) ; // everyone else can save dataURLs un-processed
			}//end if dataURL passed?

			blob = x instanceof B ?
				x :
				new B([x], {type: m}) ;


			function d2b(u) {
				var p= u.split(/[:;,]/),
					t= p[1],
					dec= p[2] == "base64" ? atob : decodeURIComponent,
					bin= dec(p.pop()),
					mx= bin.length,
					i= 0,
					uia= new Uint8Array(mx);

				for(i;i<mx;++i) uia[i]= bin.charCodeAt(i);

				return new B([uia], {type: t});
			}

			function saver(url, winMode){

				if ('download' in a) { //html5 A[download]
					a.href = url;
					a.setAttribute("download", fn);
					a.innerHTML = "downloading...";
					D.body.appendChild(a);
					setTimeout(function() {
						a.click();
						D.body.removeChild(a);
						if(winMode===true){setTimeout(function(){ self.URL.revokeObjectURL(a.href);}, 250 );}
					}, 66);
					return true;
				}

				if(typeof safari !=="undefined" ){ // handle non-a[download] safari as best we can:
					url="data:"+url.replace(/^data:([\w\/\-\+]+)/, u);
					if(!window.open(url)){ // popup blocked, offer direct download:
						if(confirm("Displaying New Document\n\nUse Save As... to download, then click back to return to this page.")){ location.href=url; }
					}
					return true;
				}

				//do iframe dataURL download (old ch+FF):
				var f = D.createElement("iframe");
				D.body.appendChild(f);

				if(!winMode){ // force a mime that will download:
					url="data:"+url.replace(/^data:([\w\/\-\+]+)/, u);
				}
				f.src=url;
				setTimeout(function(){ D.body.removeChild(f); }, 333);

			}//end saver

			if (navigator.msSaveBlob) { // IE10+ : (has Blob, but not a[download] or URL)
				return navigator.msSaveBlob(blob, fn);
			}

			if(self.URL){ // simple fast and modern way using Blob and URL:
				saver(self.URL.createObjectURL(blob), true);
			}else{
				// handle non-Blob()+non-URL browsers:
				if(typeof blob === "string" || blob.constructor===z ){
					try{
						return saver( "data:" +  m   + ";base64,"  +  self.btoa(blob)  );
					}catch(y){
						return saver( "data:" +  m   + "," + encodeURIComponent(blob)  );
					}
				}

				// Blob but not URL:
				fr=new FileReader();
				fr.onload=function(e){
					saver(this.result);
				};
				fr.readAsDataURL(blob);
			}
			return true;
		}
	};
}