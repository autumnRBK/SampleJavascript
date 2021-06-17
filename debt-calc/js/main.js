window.addEventListener('load', function(e){
    let windowTimeout = this.window.setTimeout(function(e){
        window.alert("Page Reset")
        location.reload()
    }, 120000)
    this.window.addEventListener('mousemove', function(e){
        window.clearTimeout(windowTimeout)
        windowTimeout = this.window.setTimeout(function(e){
            window.alert("Page Reset")
            location.reload()
        }, 120000)
    })
    let totalDebt = 0
    let totalCredit = 0
    let addButton = this.document.getElementById("credidDebitAdd")
    let List = []
    
     
    addButton.addEventListener('click', addItemToList)

    function addItemToList(e){
        e.preventDefault()
        document.getElementById("errors").textContent = ""
        let Errors = ""
        let valid = true
        let transactionTypeSelect = document.getElementById("creditDebitSelector")
        let transactionType =  transactionTypeSelect.options[transactionTypeSelect.selectedIndex].value
        let transactionValue = parseFloat(document.getElementById("cost").value)
        let transactionDescription = document.getElementById("transactionDescription")

        // Validate
        if(transactionType === ""){
            Errors = Errors + "select a type, "
            valid = false
        }
        if(transactionValue < 0 || isNaN(transactionValue)){
            Errors =  Errors + "value cannot be less then 0, "
            valid = false
        }
        if(transactionDescription.value === ""){
            Errors = Errors + " enter a Description you will thank me later"
            valid = false
        }
        if(valid){
            var Row = document.createElement("tr")
            if(transactionType === "debit"){
                totalDebt = totalDebt + transactionValue
                document.getElementById("TotalDebit").textContent = "$" + totalDebt.toFixed(2)
                Row.classList.add("debit")
            }else{
                totalCredit = totalCredit + transactionValue
                document.getElementById("TotalCredit").textContent = "$" + totalCredit.toFixed(2)
                Row.classList.add("credit")

            }
            var DescriptionElement = document.createElement("td")
            var TransactionElement = document.createElement("td")
            var AmmoutElement = document.createElement("td")
            var IconTableElement = document.createElement("td")
            var IconElement = document.createElement("i")
        
            var Text = document.createTextNode(transactionDescription.value)
            DescriptionElement.appendChild(Text)
        
            Text = document.createTextNode(transactionType)
            TransactionElement.appendChild(Text)
        

            Text = document.createTextNode(transactionValue.toFixed(2))
            AmmoutElement.appendChild(Text)
            AmmoutElement.classList.add("amount")
        

            IconElement.classList.add("delete")
            IconElement.classList.add("fa")
            IconElement.classList.add("fa-trash-o")


            IconTableElement.appendChild(IconElement) 
            IconTableElement.classList.add("tools")

            Text = List.length
            IconElement.id = Text;
            Row.id = Text + "Row"
            List.push([transactionType,transactionValue.toFixed(2)])
        
        

            Row.appendChild(DescriptionElement)
            Row.appendChild(TransactionElement)
            Row.appendChild(AmmoutElement)
            Row.appendChild(IconTableElement)
            document.getElementById("TableBody").appendChild(Row)
        

            document.getElementById("cost").value = 0
            document.getElementById("transactionDescription").value = ""
        
            document.getElementById(Text).addEventListener("click", function(e){
                let RowToRemove = document.getElementById(e.target.id + "Row")
                let RowAmmount = List[e.target.id][1]
                if(window.confirm("Do you wish to delete")){
                    if(List[e.target.id][0] === "debit")
                    {
                    totalDebt = totalDebt - RowAmmount
                    document.getElementById("TotalDebit").textContent = "$" + totalDebt.toFixed(2)
                    }
                    else
                    {
                    totalCredit = totalCredit - RowAmmount
                    document.getElementById("TotalCredit").textContent = "$" + totalCredit.toFixed(2)
                    }
                    document.getElementById("TableBody").removeChild(RowToRemove)
                    if(List.length - 1 != e.target.id){
                        document.getElementById(List.length - 1).id = e.target.id
                        document.getElementById(List.length - 1 + "Row").id = e.target.id + "Row"
                        List[e.target.id] = List[List.length - 1]
                    }
                    List.pop()
                }
                
            

            })

        }
        else
        {
            document.getElementById("errors").textContent = Errors
        }
    }
    
})