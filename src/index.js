//T12XNN62PCMC53Y8
let stockData = []

var request = new XMLHttpRequest()
request.open('GET', 'https://www.alphavantage.co/query?function=SMA&symbol=MSFT&interval=weekly&time_period=10&series_type=open&apikey=T12XNN62PCMC53Y8', true)
request.onload = function () {
    var data = JSON.parse(this.response)

    if (request.status >= 200 && request.status < 400) {
        stockData = Object.values(data["Technical Analysis: SMA"])
                          .map(el => el["SMA"])
        
        
        // WORKS
        d3.select('ul')
            .selectAll('li')
            .data(stockData)
            .enter()
            .append('li')
            .text(function (d) { return d; });

        var barHeight = 20;

        // BAR GRAPH
        // d3.select('svg')
        //     .selectAll('rect')
        //     .data(stockData)
        //     .enter()
        //     .append('rect')
        //     .attr('width', function(d) {return d})
        //     .attr('height', barHeight - 1)
 
        //     .attr("transform", function (d, i) {
        //         return "translate(0," + i * barHeight + ")";
        //     });
        
   
        console.log(stockData)

        // var t = d3.transition()
        //             .duration(500)

        var x_scale = d3.scaleLinear()
            .domain([0, stockData.length])
            .range([0, 500])

        var y_scale = d3.scaleLinear()
            .domain([d3.max(stockData), 0])
            .range([500, 0])

            
        var svg = d3.select('svg')

        var x_axis = d3.axisBottom()
            .scale(x_scale)
            // .orient('bottom')

        var y_axis = d3.axisLeft()
            .scale(y_scale)
            // .orient('left')

        svg.append("g")
            // .attr('x', 200) 
            .call(y_axis)

        svg.append("g")
            // .attr('y', 200)
            .call(x_axis)
            
        var g = svg.selectAll("g")
            .data(stockData)
            .enter()
            .append("g")

        g.append('line')
        .attr('x1', function (d, idx) { return x_scale(idx - 1)})     
        .attr('x2', function (d, idx) { return x_scale(idx) })
        .attr('y1', function (d, idx) { return y_scale(d3.max(stockData) - stockData[idx - 1]) })
        .attr('y2', function (d, idx) { return y_scale(d3.max(stockData) - stockData[idx])  })
        // .style("fill-opacity", 1e-6)
        // .attr('class', 'flashing')
        // .style("fill-opacity", 1)
        

        // g.append('text')
        //     .attr('x', function (d, idx) { return x_scale(idx) })
        //     .attr('y', 20)
        //     .attr("dy", ".35em")
        //     .text(function (d, i) { if (i % 100 === 0) return d })
        
        
    }

    else {
        console.log('error')
    }
    }

    request.send()

    // .transition()
    // .duration(1000)

