import SMAGrapher from './sma.js'
import Bollinger from './bollinger.js'
import Stochastic from './stochastic.js'

document.addEventListener("DOMContentLoaded", () => {
    //Input buttons
    document.getElementsByClassName("overview-button")[0].addEventListener('click', ()=> {
        document.getElementsByClassName("overview-description")[0].classList.toggle('hidden')
    })
    document.getElementsByClassName("button-sma")[0].addEventListener("click", () => {
        SMAGrapher()
    })
    document.getElementsByClassName("button-boll")[0].addEventListener("click", () => { 
        Bollinger()
    })
    document.getElementsByClassName("button-stoch")[0].addEventListener("click", () => { 
        Stochastic()
    })
//     let boxParts = Array.from(document.getElementsByClassName("box-top"))
    //     boxParts.forEach(part => part.style.transform = "translateY(30px)")
    document.getElementsByClassName("spinner")[0].addEventListener('mouseenter', ()=>{
        document.getElementsByClassName("spinner")[0].classList.add('spinning')
    })
    document.getElementsByClassName("spinner")[0].addEventListener('mouseleave', ()=>{
        document.getElementsByClassName("spinner")[0].classList.remove('spinning')
    })
    document.getElementsByClassName("smas-info-button")[0].addEventListener('click', ()=> {
        document.getElementsByClassName("description-smas")[0].classList.toggle('hidden')
    })
    document.getElementsByClassName("bbands-info-button")[0].addEventListener('click', ()=> {
        document.getElementsByClassName("description-bbands")[0].classList.toggle('hidden')
    })
    document.getElementsByClassName("stochs-info-button")[0].addEventListener('click', ()=> {
        document.getElementsByClassName("description-stochs")[0].classList.toggle('hidden')
    })

    document.getElementsByClassName("clear")[0].addEventListener('click', ()=>{
        d3.selectAll("svg > *")
          .exit()
          .transition()
          .duration(5000)
          .attr("opacity", "0")
          .remove();
    })

    document.getElementsByClassName("sample-tickers")[0].addEventListener('click', ()=>{
        document.getElementsByClassName("tornado")[0].classList.toggle('hidden');
    })
    //select from tornado
    Array.from(document.getElementsByClassName("cell")).forEach(el => {
        el.addEventListener('click', e => {
             document.getElementsByClassName("input-sma")[0].value = e.currentTarget.innerText
        })
    })
  
})

