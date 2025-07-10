//Constantes
const inputs = document.querySelector(".input-group")
const drawButton = document.getElementById("draw-button")
const quantityInput = document.getElementById("quantity")
const minInput = document.getElementById("min")
const maxInput = document.getElementById("max")
const noRepeatInput = document.getElementById("no-repeat")

inputs.addEventListener("input", () =>{
    //Agora o input aceita apenas números
    let value = inputs.value.replace(/[^0-9]/g, "")
    inputs.value = value
})

//Validação se os números seguem os padrões

drawButton.addEventListener("click", (event) => {
    event.preventDefault()
    
    const draw = {
        quantity: Number(quantityInput.value),
        min: Number(minInput.value),
        max: Number(maxInput.value),
        noRepeat: noRepeatInput.checked
    }

    //Validação
    if(draw.quantity > draw.max){
        alert("A quantidade de números deve ser menor ou igual ao intervalo!")
    }else if(draw.min > draw.max){
        alert("O valor mínimo deve ser menor ou igual ao valor máximo!")
    }else if (draw.min < 0){
        alert("O valor mínimo deve ser maior que 0!")
    }else if(draw.noRepeat && draw.quantity > (draw.max - draw.min + 1)){
        alert(`Não é possível sortear ${draw.quantity} números únicos no intervalo de ${draw.min} a ${draw.max}.`)
    }else{
        const drawnNumbers = drawNumbers(draw)
        displayResults(drawnNumbers)
    }
})

function drawNumbers(draw){
    const numbers = []
    try {
        if (draw.noRepeat) {
            // Sorteio sem repetição
            const availableNumbers = []
            for (let i = draw.min; i <= draw.max; i++) {
                availableNumbers.push(i)
            }
            
            // Embaralhar os números
            for (let i = availableNumbers.length - 1; i > 0; i--) {
                const j = Math.floor(Math.random() * (i + 1))
                const temp = availableNumbers[i]
                availableNumbers[i] = availableNumbers[j]
                availableNumbers[j] = temp
            }
            
            // Pegar os primeiros 'quantity' números
            return availableNumbers.slice(0, draw.quantity)
        } else {
            // Sorteio com possível repetição
            for(let i = 0; i < draw.quantity; i++){
                const number = Math.floor(Math.random() * (draw.max - draw.min + 1)) + draw.min
                numbers.push(number)
            }
            return numbers
        }
    } catch (error) {
        alert(error.message)
    }
}

function displayResults(numbers){
    const resultContainer = document.getElementById("result")
    resultContainer.innerHTML = ""
    numbers.forEach(number => {
        const resultNumber = document.createElement("div")
        resultNumber.classList.add("result-number")
        resultNumber.textContent = number
        resultContainer.appendChild(resultNumber)
        
        // Adicionar a classe show com um pequeno atraso para ativar a animação
        setTimeout(() => {
            resultNumber.classList.add("show")
        }, 50)
    })
}



