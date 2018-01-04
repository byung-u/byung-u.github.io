var $ = go.GraphObject.make;  // for conciseness

// define a simple Node template
myDiagram.nodeTemplate =
  $(go.Node, "Auto",  // the Shape will go around the TextBlock
    $(go.Shape, "RoundedRectangle",
      // Shape.fill is bound to Node.data.color
      new go.Binding("fill", "color")),
    $(go.TextBlock,
      { margin: 3 },  // some room around the text
      // TextBlock.text is bound to Node.data.key
      new go.Binding("text", "key"))
  );

// create the model data that will be represented by Nodes and Links
myDiagram.model = new go.GraphLinksModel(
[
  { key: "Alpha", color: "lightblue" },
  { key: "Beta", color: "orange" },
  { key: "Gamma", color: "lightgreen" },
  { key: "Delta", color: "pink" }
],
[
  { from: "Alpha", to: "Beta" },
  { from: "Alpha", to: "Gamma" },
  { from: "Beta", to: "Beta" },
  { from: "Gamma", to: "Delta" },
  { from: "Delta", to: "Alpha" }
]);
