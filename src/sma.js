
const SMAGrapher = () => {
    d3.selectAll(".svg-smas > *")
        
        .remove();

    let tick = document.getElementsByClassName("input-sma")[0].value
    // let numWeeks = document.getElementsByClassName("input-sma-weeks")[0].value

    var request = new XMLHttpRequest()
    request.open('GET', `https://www.alphavantage.co/query?function=SMA&symbol=${tick}&interval=weekly&time_period=3&series_type=open&apikey=T12XNN62PCMC53Y8`, true)
    request.onload = function () {
        var data = JSON.parse(this.response)

        if (request.status >= 200 && request.status < 400) {

            // let data = stockData

            //GLOBAL
            let dataSMAsFloat = Object.values(data["Technical Analysis: SMA"])
                .map(el => parseFloat(el["SMA"])).reverse()
            let dataYears = Object.keys(data["Technical Analysis: SMA"])
                .map(el => parseInt(el)).reverse()

            // console.log(dataSMAsFloat)

            var margin = { top: 50, right: 50, bottom: 50, left: 50 }
            var width = 600 - margin.left //950
            var height = 500 - margin.bottom
            //svg has full height and width
            var svg = d3.select('.svg-smas')
                .attr('width', width + margin.left)
                .attr('height', height + margin.bottom)
            var g1 = svg.append('g')
                .attr('transform', 'translate(' + margin.left + ',' + 0 + ')')
                .attr('class', 'svg-g')

            var x_scale = d3.scaleLinear()
                .domain([0, dataSMAsFloat.length - 1])
                .range([0, width])

            var new_x_scale = d3.scaleLinear()
                .domain([d3.min(dataYears), d3.max(dataYears)])
                .range([0, width])

            var y_scale = d3.scaleLinear()
                .domain([d3.max(dataSMAsFloat), 0])
                .range([height, 0])

            var new_y_scale = d3.scaleLinear()
                .domain([0, d3.max(dataSMAsFloat)])
                .range([height, 0])

            var x_axis = d3.axisBottom()
                .scale(new_x_scale)
                .tickFormat(d => `${d}`)
            var y_axis = d3.axisLeft()
                .scale(new_y_scale)

            svg.append("g")
                .attr("transform", `translate(50, ${0})`) //2nd val needs to adjust for y shifts
                .call(y_axis)

            svg.append("text")
                .attr("transform", "rotate(-90)")
                .attr("y", margin.left - 30)
                .attr("x", 0 - (height / 2))
                .style("text-anchor", "middle")
                .text("$");

            svg.append("g")
                .attr("transform", "translate(50," + height + ")") //1st val needs to change
                .call(x_axis.ticks(10))

            svg.append("text")
                .attr("transform", "translate(" + (width / 2 + margin.left) + " ," + (height + margin.bottom) + ")")
                .style("text-anchor", "middle")
                .text("Year");

            var g = g1.selectAll("g")
                .data(dataSMAsFloat)
                .enter()
                .append("g")

            var lines = g.append('line')
                .attr('x1', function (d, idx) { return x_scale(idx - 1) })
                .attr('x2', function (d, idx) { return x_scale(idx) })

                .attr('y1', function (d, idx) { return height - 50 })
                .attr('y2', function (d, idx) { return height - 50 })
                .attr('class', 'line-sma')

            lines.transition()
                .duration(2000)
                .style('stroke', function (d, idx) {
                    if (d > dataSMAsFloat[idx - 1]) {
                        return 'rgb(80, 160, 250)'
                    } else {
                        return 'rgb(213, 168, 46)'
                    }
                    // return 'rgb(10, 12, 22)'
                })
                .attr('y1', function (d, idx) { return y_scale(d3.max(dataSMAsFloat) - (dataSMAsFloat[idx - 1] || d)) })
                .attr('y2', function (d, idx) { return y_scale(d3.max(dataSMAsFloat) - d) })

            lines.on("mouseover", handleMouseOver)

            Array.from(document.getElementsByClassName("line-sma")).forEach(el => {
                el.addEventListener('mouseenter', e => {
                    document.getElementsByClassName("tooltip")[0].style.left = `${e.pageX}` + "px"
                    document.getElementsByClassName("tooltip")[0].style.top = `${e.pageY}` + "px"
                })
            })
            /////////

            ///////
            var request2 = new XMLHttpRequest()
            request2.open('GET', `https://www.alphavantage.co/query?function=SMA&symbol=${tick}&interval=weekly&time_period=7&series_type=open&apikey=T12XNN62PCMC53Y8`, true)
            request2.onload = function () {
                var data2 = JSON.parse(this.response)

                if (request2.status >= 200 && request2.status < 400) {
                    let dataSMAsFloat2 = Object.values(data2["Technical Analysis: SMA"])
                        .map(el => parseFloat(el["SMA"])).reverse()

                    var x_scale = d3.scaleLinear()
                        .domain([0, dataSMAsFloat2.length - 1])
                        .range([0, width])

                    var line = d3.line() //define how to make lines
                        .x((d, idx) => x_scale(idx))
                        .y((d, idx) => y_scale(d3.max(dataSMAsFloat.concat(dataSMAsFloat2)) - d))

                    var g1 = svg.append('g')
                        .attr('transform', 'translate(' + margin.left + ', 0)')

                    var path = g1.append('path') //new
                        .attr('d', line(dataSMAsFloat2))
                        .attr('stroke', 'rgb(15, 15, 15)')
                        .attr('stroke-width', '2')
                        .attr('fill', 'none')
                        .attr('class', 'draw')
                    ////////////
                }
                else {
                    console.log('error')
                }
            }
            request2.send()
            //////////
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



    


}

export default SMAGrapher