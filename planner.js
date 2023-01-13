$(document).ready(function () {
    console.log("***", localStorage.getItem('D-balance'));
    if (!localStorage.getItem('D-balance')) {
        $('.set_balance').show();
    } else {
        $('.set_balance').hide();
    }
    set_expense_table();
    $('#set_intial_balance').click((event) => {
        let initial_balance = $('.add_initial_balance').val();
        console.log("initial", initial_balance);
        localStorage.setItem("D-balance", initial_balance);
        $('.set_balance').hide();
        set_expense_table();
    });
    $('#btn-save').click((event) => {
        let description = $('#description_text').val();
        let type = $('#type_field').val();
        let amount = $('#amount_text').val();
        console.log("555", description, type, amount);
        if (parseFloat(amount)) {
            let add_entry = {
                description: description,
                type: type,
                amount: amount
            }
            var entryItemJSON = JSON.stringify(add_entry);
            var entryArray = new Array();
            if (localStorage.getItem('D-cart-data')) {
                entryArray = JSON.parse(localStorage.getItem('D-cart-data'));
            }
            entryArray.push(entryItemJSON);
            var entryJSON = JSON.stringify(entryArray);
            localStorage.setItem('D-cart-data', entryJSON);
        }


        set_expense_table();
    });

    function set_expense_table() {
        $('#entry_items').empty();
        let table_elements;
        let initial_amt;
        let total_amt;
        let total_income = 0;
        let total_expense = 0;
        var entryArray = new Array();

        if (localStorage.getItem('D-cart-data')) {
            entryArray = JSON.parse(localStorage.getItem('D-cart-data'));
        }
        if (localStorage.getItem('D-balance')) {
            initial_amt = parseFloat(JSON.parse(localStorage.getItem('D-balance')));
        } else {
            initial_amt = 0;
        }
        // console.log("elele",e)
        entryArray.forEach((element, index) => {
            let item = JSON.parse(element);
            let amount_item;
            let total_amt;

            if (item.type == 'income' ) {
                amount_item = `<td class="text-success">${item.amount}</td>`;
                initial_amt += parseFloat(item.amount);
                total_income += parseFloat(item.amount);
            } else {
                amount_item = `<td class="text-danger"> - ${item.amount}</td>`;
                initial_amt -= parseFloat(item.amount);
                total_expense += parseFloat(item.amount);
            }
            table_elements += `<tr>
            <td>${index +1}</td>
            <td>${item.description}</td>
            <td>${item.type}</td>
            ${amount_item}
          </tr>`;
        });
        if (initial_amt && (total_income || total_expense)) {
            let total_amt_element = `<td colspan="3" class="total_label"><h6>Balance :- </h6></td><td id="total_amt">${parseFloat(initial_amt).toFixed(2)}</td>`
            $('#total_amt').empty();
            $('#total_amt').append(total_amt_element);
        }
        $('#entry_items').append(table_elements);

        console.log("888", $('#availabe_bal'));
        $('#availabe_bal').val(parseFloat(initial_amt).toFixed(2));
        console.log("total_expense", total_expense);
        $('#total_expense').val(parseFloat(total_expense).toFixed(2));
        console.log("total_income", total_income);
        $('#total_income').val(parseFloat(total_income).toFixed(2));

    }

});