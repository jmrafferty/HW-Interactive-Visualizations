var url = "https://gist.githubusercontent.com/jmrafferty/4ae6fe5a502640674ea5227f82d6eddf/raw/5876f6e853ba3ee364e41710d8160fb695abda1f/samples.json"


d3.json(url).then(function (data) {
  console.log(data)

  for (let i = 0; i < data.names.length; i++){
    $('#selDataset').append(`<option value=${data.names[i]}>${data.names[i]}</option>`);
  }
 
  
 
  d3.selectAll("#selDataset").on("change",function(){
    $("#sample-metadata").empty();
    var dropdownMenu = d3.select("#selDataset");
    // Assign the value of the dropdown menu option to a variable
    var dataset = dropdownMenu.property("value");
  
  var filtered_metaData = data.metadata.filter(data_value => data_value.id == dataset)
  
  console.log(filtered_metaData)
  var id = `id: ${dataset}`;
  var age = `Age: ${filtered_metaData[0].age}`;
  var bbtype = `BBType: ${filtered_metaData[0].bbtype}`;
  var ethnicity = `Ethnicity: ${filtered_metaData[0].ethnicity}`;
  var gender = `Gender: ${filtered_metaData[0].gender}`;
  var location = `Location: ${filtered_metaData[0].location}`;
  
  console.log(age)
  console.log(bbtype)
  $("#sample-metadata").append("<p>" + id + "</p>")
  $("#sample-metadata").append("<p>" + age + "</p>")
  $("#sample-metadata").append("<p>" + bbtype + "</p>")
  $("#sample-metadata").append("<p>" + ethnicity + "</p>")
  $("#sample-metadata").append("<p>" + gender + "</p>")
  $("#sample-metadata").append("<p>" + location + "</p>")


    
    console.log(dataset)
    let filter_data = data.samples.filter(data_value => data_value.id == dataset)
    console.log(filter_data)
    let otu_labels = filter_data.map(otuID => otuID.otu_ids)
  let otu_sample_values = filter_data.map(row => row.sample_values)
  let otu_words = filter_data.map(row => row.otu_labels)
  console.log(otu_sample_values)
  console.log(otu_labels)
  

  var trace1 = {
    x: otu_labels[0].slice(0,10),
    y: otu_sample_values[0].slice(0,10),

    name: "Bar Chart",
    type: "bar", 

  };

  let otu_strings = [];
  let otu_word_labels = [];

  for ( let i =0; i < otu_labels[0].length; i++){
    otu_strings.push(`OTU: ${otu_labels[0][i]}`)
    otu_word_labels.push(otu_words[0][i].split(";")[otu_words[0][i].split(";").length -1])
   
  }

  console.log(otu_word_labels)

  // Apply the group barmode to the layout
  var layout = {
    title: "Top 10 OTUs",
    xaxis: { title: "" },
    yaxis: { title: "Flicker Frequency" }
  }
let result = otu_words[0];
  var trace2 = {
    x: otu_labels[0].slice(0,10),
    y: otu_sample_values[0].slice(0,10),
    text: otu_word_labels.slice(0,10),
    mode: 'markers',
    marker: {
      color: otu_labels[0].slice(0,10),
      size: otu_sample_values[0].slice(0,10),
      colorscale: 'Earth',
    }
  };
  

  
  var layout2 = {
    title: 'Marker Size',
    showlegend: false,
    height: 600,
    width: 600
  };
  
  Plotly.newPlot('bubble', [trace2], layout2);

  // Render the plot to the div tag with id "plot"
  Plotly.newPlot("plot", [trace1], layout);
  });



  

});



// 1) filter data to equal same ID
// 2) Create variable for OTU_IDs and Sample_Values
// 3) Slice both variables to show first 10

