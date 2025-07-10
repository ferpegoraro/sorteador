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
            // 1. Primeiro criamos um array com todos os números possíveis no intervalo
            const availableNumbers = []
            for (let i = draw.min; i <= draw.max; i++) {
                availableNumbers.push(i)
            }
            
            // 2. Embaralhar os números usando o algoritmo Fisher-Yates (ou Knuth)
            // Este é um algoritmo eficiente que garante que cada permutação é igualmente provável
            for (let i = availableNumbers.length - 1; i > 0; i--) {
                // 2.1. Para cada posição, começando do final do array:
                // Escolhemos um índice aleatório de 0 até i (inclusive)
                const j = Math.floor(Math.random() * (i + 1))
                
                // 2.2. Trocamos o elemento na posição atual (i) com o elemento na posição aleatória (j)
                // Esta é uma técnica de desestruturação para trocar valores sem usar variável temporária
                const temp = availableNumbers[i]
                availableNumbers[i] = availableNumbers[j]
                availableNumbers[j] = temp
                
                // 2.3. A cada iteração, reduzimos o intervalo de embaralhamento
                // Os elementos já processados (no final do array) não são mais considerados
            }
            
            // 3. Pegar apenas a quantidade solicitada de números do início do array embaralhado
            return availableNumbers.slice(0, draw.quantity)
        } else {
            // Sorteio com possível repetição
            // 1. Neste caso, sorteamos cada número independentemente
            for(let i = 0; i < draw.quantity; i++){
                // 1.1. Geramos um número aleatório dentro do intervalo [min, max]
                // Math.random() gera um decimal entre 0 (inclusive) e 1 (exclusivo)
                // Multiplicamos pelo tamanho do intervalo (max - min + 1)
                // Arredondamos para baixo com Math.floor
                // Somamos o valor mínimo para deslocar o intervalo
                const number = Math.floor(Math.random() * (draw.max - draw.min + 1)) + draw.min
                
                // 1.2. Adicionamos o número ao array de resultados
                // Como não verificamos se o número já existe, podem ocorrer repetições
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



