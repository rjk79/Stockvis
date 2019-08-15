import Bollinger from './bollinger.js'

document.addEventListener("DOMContentLoaded", () => {
    document.getElementsByClassName("button-sma")[0].addEventListener("click", () => {
        SMAGrapher(3)
    })
})

const SMAGrapher = (numWeeks) => {
    // Bollinger()
    debugger
    let tick = document.getElementsByClassName("input-sma")[0].value
    
    var request = new XMLHttpRequest()
    request.open('GET', `https://www.alphavantage.co/query?function=SMA&symbol=${tick}&interval=weekly&time_period=3&series_type=open&apikey=T12XNN62PCMC53Y8`, true)
    request.onload = function () {
        var data = JSON.parse(this.response)

        if (request.status >= 200 && request.status < 400) {

            // let data = stockData
            
            let reverseDataSMAs = Object.values(data["Technical Analysis: SMA"])
                            .map(el => parseFloat(el["SMA"]))
            let reverseDataYears = Object.keys(data["Technical Analysis: SMA"])
                            .map(el => parseInt(el))
            let dataSMAsFloat = reverseDataSMAs.reverse()
            let dataYears = reverseDataYears.reverse()
            // let dataPoints = dataYears.map((year, idx) => ( {"year": year, "SMA": dataSMAsFloat[idx]} ))
            
            // WORKS
            // d3.select('ul')
            //     .selectAll('li')
            //     .data(dataSMAsFloat)
            //     .enter()
            //     .append('li')
            //     .text(function (d) { return d; });

                
                // BAR GRAPH
                // var barHeight = 20;
            // d3.select('svg')
            //     .selectAll('rect')
            //     .data(dataSMAsFloat)
            //     .enter()
            //     .append('rect')
            //     .attr('width', function(d) {return d})
            //     .attr('height', barHeight - 1)
    
            //     .attr("transform", function (d, i) {
            //         return "translate(0," + i * barHeight + ")";
            //     });
            
    
            // console.log(dataSMAsFloat)

            var margin = { top: 50, right: 50, bottom: 50, left: 50 }
            var width = 950 - margin.left 
            var height = 500 - margin.bottom
            //svg has full height and width
            var svg = d3.select('.svg-smas')
                        .attr('width', width + margin.left )
                        .attr('height', height + margin.bottom)
            var g1 = svg.append('g')
                        .attr('transform', 'translate(' + margin.left + ',' + 0 + ')')
                        .attr('class', 'svg-g')

            var x_scale = d3.scaleLinear()
                .domain([0, dataSMAsFloat.length -1])
                .range([0, width])
            
            var new_x_scale = d3.scaleLinear()
                .domain([d3.min(dataYears), d3.max(dataYears)])
                .range([0, width ])    

            var y_scale = d3.scaleLinear()
                .domain([d3.max(dataSMAsFloat), 0])
                .range([height, 0])

            var new_y_scale = d3.scaleLinear()
                .domain([0, d3.max(dataSMAsFloat)])
                .range([height , 0])
        
            var x_axis = d3.axisBottom()
                .scale(new_x_scale)
                .tickFormat(d => `${d}`)
            var y_axis = d3.axisLeft()
                .scale(new_y_scale)

            svg.append("g")
                .attr("transform", `translate(50, ${0})`) //2nd val needs to adjust for y shifts
                .call(y_axis)

            svg.append("g")
                .attr("transform", "translate(50," + height + ")") //1st val needs to change
                .call(x_axis.ticks(10))

            var g = g1.selectAll("g")
                .data(dataSMAsFloat)
                .enter()
                .append("g")
            
            var lines = g.append('line')
                .attr('x1', function (d, idx) { return x_scale(idx - 1)   })     
                .attr('x2', function (d, idx) { return x_scale(idx )   })

                .attr('y1', function (d, idx) { return height -50 })
                .attr('y2', function (d, idx) { return height -50 })
                .attr('class', 'line-sma')

            lines.transition()
                 .duration(2000)
                 .style('stroke', function (d, idx) {
                    if (d > dataSMAsFloat[idx - 1]) {
                        return 'cyan'
                    } else {
                        return 'hotpink'
                    }
                 })
                 .attr('y1', function (d, idx) { return y_scale(d3.max(dataSMAsFloat) - (dataSMAsFloat[idx - 1] || d))  })
                 .attr('y2', function (d, idx) { return y_scale(d3.max(dataSMAsFloat) - d )  })
                
            lines.on("mouseover", handleMouseOver)
        
        Array.from(document.getElementsByClassName("line-sma")).forEach(el => {
            el.addEventListener('mouseenter', e => {
                document.getElementsByClassName("tooltip")[0].style.left = `${e.pageX}` + "px"
                document.getElementsByClassName("tooltip")[0].style.top = `${e.pageY}` + "px"
        }
        )
    }
    )
            
        }
        else {
            console.log('error')
        }
        }
        request.send()


    function handleMouseOver(e) {
        
        document.getElementsByClassName("tooltip")[0].style.display = "inline-block"
        document.getElementsByClassName("tooltip")[0].innerHTML = "SMA: $" + `${parseFloat(e).toFixed(2)}`
    }


    // document.getElementsByClassName("tooltip")[0].addEventListener('mouseleave', e => {
    //     document.getElementsByClassName("tooltip")[0].style.display = "none"
    // })

    
    // var request2 = new XMLHttpRequest()
    // request2.open('GET', `https://www.alphavantage.co/query?function=SMA&symbol=${tick}&interval=weekly&time_period=7&series_type=open&apikey=T12XNN62PCMC53Y8`, true)
    // request2.onload = function () {
    //     var data = JSON.parse(this.response)
    //     debugger

    //     if (request2.status >= 200 && request2.status < 400) {
    //         debugger

    //         let reverseDataSMAs = Object.values(data["Technical Analysis: SMA"])
    //             .map(el => parseFloat(el["SMA"]))
            
    //         let dataSMAsFloat = reverseDataSMAs.reverse()

    //         var g1 = d3.select('.svg-g')
    //         var g = g1.selectAll("g")
    //             .data(dataSMAsFloat)
    //             .enter()
    //             .append("g")

    //         var lines = g.append('line')
    //             .attr('x1', function (d, idx) { return x_scale(idx - 1) })
    //             .attr('x2', function (d, idx) { return x_scale(idx) })

    //             .attr('y1', function (d, idx) { return y_scale(d3.max(dataSMAsFloat) - (dataSMAsFloat[idx - 1] || d)) })
    //             .attr('y2', function (d, idx) { return y_scale(d3.max(dataSMAsFloat) - d) })
    //             .attr('class', 'line-sma')
    //             .style('stroke', function (d, idx) {
    //                 if (d > dataSMAsFloat[idx - 1]) {
    //                     return 'green'
    //                 } else {
    //                     return 'red'
    //                 }
    //             })


    //     }
    //     else {
    //         console.log('error')
    //     }
    // }
    // request2.send()



    }

