$(function () {
    //Json data by api call for order table
    $.get(orderListApiUrl, function (response) {
        if(response) {
            var table = '';
            var totalAmount = 0;
            $.each(response, function(index, orders) {
                totalAmount += parseFloat(orders.total);
                table += '<tr>' +
                    '<td>'+ orders.datetime +'</td>'+
                    '<td>'+ orders.order_id +'</td>'+
                    '<td>'+ orders.customer_name +'</td>'+
                    '<td>'+ orders.total +' Dollar</td></tr>';
            });
            table += '<tr><td colspan="3" style="text-align: end"><b>Total</b></td><td><b>'+ totalAmount.toFixed(2) +' Dollar</b></td></tr>';
            $("table").find('tbody').empty().html(table);
        }
    });
});