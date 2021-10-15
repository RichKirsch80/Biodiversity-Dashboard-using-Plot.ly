
function unpack(rows, index) {
  return rows.map(function(row) {
    return row[index];
  });
}



function getData() {

  d3.json("samples.json").then(function(data) {
    var metadata = data.metadata;
    var id = metadata[0].id; 
    var ethnicity = metadata[0].ethnicity;
    var gender = metadata[0].gender;
    var age = metadata[0].age;
    var location = metadata[0].location;
    var bbtype = metadata[0].bbtype;
    var wfreq = metadata[0].wfreq;
    var table = d3.select("#sample-metadata");
    var tbody = table.select("panel-body");
    
  });
}

getData();


function buildPlot() {

  d3.json("samples.json").then(function(data) {
    // Grab values from the response json object to build the plots
    var name = data.names;
    var samples = data.samples;
    var metadata = data.metadata[0];
    var otu_ids = data.samples[0].otu_ids.slice(0,10).reverse();
    var sample_values = samples[0].sample_values.slice(0,10).reverse();
    var otu_labels = samples[0].otu_labels.slice(0,10).map(otu_ids => `OTU ${otu_ids}`).reverse();
    //var dates = data.dataset.data.map(row => row[0]);
     console.log(name);
     console.log(metadata);
     console.log(otu_labels);

    d3.selectAll("#selDataset").on("change", updateSubject)

    var trace1 = {
      type: "bar",
      x: sample_values,
      text: otu_ids,
      orientation: "h"
    };

    var barData = [trace1];

    var layout = {
      title: `Top 10 Bacteria Cultures Found`,
      margin: {
        l:100,
        r:100,
        t:100,
        b:100
      }
    };

    Plotly.newPlot("bar", barData, layout);

  });
}

buildPlot();