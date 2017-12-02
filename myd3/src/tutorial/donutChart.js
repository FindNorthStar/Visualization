function donutChart() {
    d3.json("data/suicide-squad.json", function (data) {
        var redius = 100;
        var color = d3.scaleOrdinal()
            .range(["red", "orange", "yellow", "green", "blue", "indigo", "violet"]);

        var canvas = d3.select(".donutChart")
            .append("svg")
            .attr("width", 1000)
            .attr("height", 1000);

        var group = canvas.append("g")
            .attr("transform", "translate(500,350)");

        var arc = d3.arc()
            .innerRadius(50)
            .outerRadius(redius);

        var pie = d3.pie()
            .value(function (d) {
                return d.rank;
            });

        var theArc = group.selectAll(".arc")
            .data(pie(data))
            .enter()
            .append("g")
            .attr("class", "arc");

        theArc.append("path")
            .attr("d", arc)
            .attr("fill", function (d) {
                return color(d.data.rank);
            });

        theArc.append("text")
            .attr("transform", function (d) {
                return "translate(" + arc.centroid(d) + ")";
            })
            .attr("dy", "0.15em")
            .text(function (d) {
                return d.data.rank;
            });

    });

}