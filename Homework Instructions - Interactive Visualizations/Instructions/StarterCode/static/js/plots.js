var url = "https://gist.githubusercontent.com/jmrafferty/4ae6fe5a502640674ea5227f82d6eddf/raw/5876f6e853ba3ee364e41710d8160fb695abda1f/samples.json"



function build(sample){
d3.json(url).then((data) => {
console.log(data.samples)
var trace1 = {
    x: data.map(row => row.pair),
    y: data.map(row => row.greekSearchResults),
    text: data.map(row => row.greekName),
    name: "Greek",
    type: "bar"
  };

// Apply the group barmode to the layout
  var layout = {
    title: "Greek vs Roman gods search results",
    }

  // Render the plot to the div tag with id "plot"
  Plotly.newPlot("plot", data, layout);
 
});

}

build(url);
