
function unpack(rows, index) {
  return rows.map(function(row) {
    return row[index];
  });
}
function init(){
  var selector = d3.select("#selDataset");
  d3.json("samples.json").then((ids)=> {
    console.log(ids);
    ids.names.forEach((sample) => {
      selector.append("option").text(sample).property("value", sample);
    }
    );
  })
  buildPlot(940);
  getData(940);
}
init();


function getData(sample) {
  console.log(sample);
  d3.json("samples.json").then((items)=> {
    var metadata = items.metadata;
    var resultsArray = metadata.filter (s => s.id == sample);
    var result = resultsArray[0];
    console.log(result);

    var table = d3.select("#sample-metadata");
    table.html("");
    
    Object.entries(result).forEach(([k, v]) => {
      table.append("h6").text(`${k}:${v}`)

    });
    var gaugeData = [
      {
        domain: { x: [0, 1], y: [0, 1] },
        value: result.wfreq,
        title: { text: "Belly Button Washing Frequency"},
        type: "indicator",
        mode: "gauge+number",
        gauge: {
          axis: { visible: true, range: [0, 9]},
          steps: [
            { range: [0, 9], color: "lightblue" }
          ],
          threshold: {
              line: { color: "red", width: 4 },
              thickness: 0.75,
              value: result.wfreq
            } 
          
      }
    }
    ];

    var layout = { width: 600, height: 500, margin: { t: 0, b: 0 } };

    Plotly.newPlot('gauge', gaugeData, layout);

  });
};

function optionChanged(sample) {
  getData(sample);
  buildPlot(sample);
}



function buildPlot(sample) {
  console.log(sample);
  d3.json("samples.json").then(function(data) {
    var name = data.names;
    var samples = data.samples;
    var metadata = data.metadata;

    
    var resultsArray2 = samples.filter (sf => sf.id == sample);
    var result2 = resultsArray2[0];
    var otu_ids = result2.otu_ids;
    var sample_values = result2.sample_values;
    var otu_labels = result2.otu_ids;
     console.log(name);
     console.log(metadata);
     console.log(otu_labels);

    var trace1 = {
      type: "bar",
      x: sample_values.slice(0,10).reverse(),
      y: otu_labels.slice(0,10).map(otu_ids => `OTU ${otu_ids}`).reverse(),
      text: otu_ids.slice(0,10).reverse(),
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

    var trace2 = {
      x: otu_ids,
      y: sample_values,
      mode: 'markers',
      marker: {
        size: sample_values,
        color: otu_ids,
        text: otu_labels
      }
    };
    
    var bubbleData = [trace2];
    
    var layout1 = {
      title: 'Bacteria Cultures Per Sample',
      showlegend: false,
      height: 600,
      width: 1000,
      xaxis: {
        title: {
          text: "OTU ID",
        }
      }
    };
    
    Plotly.newPlot('bubble', bubbleData, layout1);

    
  });
}

