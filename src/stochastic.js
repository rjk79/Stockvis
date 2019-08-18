const Stochastic = () => {
    let tick = document.getElementsByClassName("input-sma")[0].value
    var request = new XMLHttpRequest()
    request.open('GET', `https://www.alphavantage.co/query?function=STOCH&symbol=${tick}&interval=weekly&apikey=T12XNN62PCMC53Y8`, true)
    request.onload = function () {
        var data = JSON.parse(this.response)
        if (request.status >= 200 && request.status < 400) {
            // let data = bollData
            let slowK = Object.values(data["Technical Analysis: STOCH"])
                .map(el => parseFloat(el["SlowK"])) .reverse()
            let slowD = Object.values(data["Technical Analysis: STOCH"])
                .map(el => parseFloat(el["SlowD"])) .reverse() 
            let dataYears = Object.keys(data["Technical Analysis: STOCH"])
                .map(el => parseInt(el)) .reverse()
            //set SVG
            var margin = { top: 50, right: 50, bottom: 50, left: 50 }
            var width = 600 - margin.left
            var height = 500 - margin.bottom

            var svg = d3.select('.svg-stochs')
                .attr('width', width + margin.left)
                .attr('height', height + margin.bottom)
            //Scale everything
            var x_scale = d3.scaleLinear() //scaleTime?
                .domain([0, slowK.length - 1])
                .range([0, width])

            var new_x_scale = d3.scaleLinear()
                .domain([d3.min(dataYears), d3.max(dataYears)])
                .range([0, width])

            var y_scale = d3.scaleLinear()
                .domain([d3.max(slowK), 0]) //divide by MAX of highest band
                .range([height, 0]) //multiply by 500

            var new_y_scale = d3.scaleLinear()
                .domain([0, d3.max(slowK)])
                .range([height, 0])

            var x_axis = d3.axisBottom()
                .scale(new_x_scale)
                .tickFormat(d => `${d}`)
            var y_axis = d3.axisLeft()
                .scale(new_y_scale)
            //Axis labels
            svg.append("g")
                .attr("transform", "translate(50, 0)") //2nd val needs to adjust for y shifts
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

            //Slow K line
            var line = d3.line() //NEW
                .x((d, idx) => x_scale(idx))
                .y((d, idx) => y_scale(d3.max(slowK) - d))

            var g1 = svg.append('g')
                .attr('transform', 'translate(' + margin.left + ', 0)')
                .attr('class', 'slowK-line')

            var path = g1.append('path') //new
                .attr('d', line(slowK))
                .attr('stroke', 'rgb(161, 185, 22)')
                .attr('stroke-width', '2')
                .attr('fill', 'none')
                .attr('class', '')


            //Slow D line

            var g2 = svg.append('g')
                .attr('transform', 'translate(' + margin.left + ', 0)')
                .attr('class', 'slowD-line')

            var path2 = g2.append('path') //new
                .attr('d', line(slowD))
                .attr('stroke', 'cyan')
                .attr('stroke-width', '2')
                .attr('fill', 'none')
                .attr('class', '')
           

        }
        else {
            console.log('error')
        }
    }
    request.send()


    function handleMouseOver(e) {

        document.getElementsByClassName("tooltip")[0].style.display = "inline-block"
        document.getElementsByClassName("tooltip")[0].innerHTML = "$" + `${parseFloat(e).toFixed(2)}`
    }

    // fade()

}

export default Stochastic