var productModal = $("#productModal");
    $(function () {

        //JSON data by API call
        $.get(productListApiUrl, function (response) {
            if(response) {
                var table = '';
                $.each(response, function(index, product) {
                    table += '<tr data-id="'+ product.product_id +'" data-name="'+ product.name +'" data-unit="'+ product.unit_id +'" data-saleprice="'+ product.unitsaleprice +'"data-costprice="'+ product.currentcostprice +'">' +
                        '<td>'+ product.name +'</td>'+
                        '<td>'+ product.unitname +'</td>'+
                        '<td>'+ product.unitsaleprice +'</td>'+
                        '<td>'+ product.currentcostprice +'</td>'+
                        '<td><span class="btn btn-xs btn-danger delete-product">Delete</span></td></tr>';
                });
                $("table").find('tbody').empty().html(table);
            }
        });
    });

    // Save Product
    $("#saveProduct").on("click", function () {
        // If we found id value in form then update product detail
        var data = $("#productForm").serializeArray();
        var requestPayload = {
            name: null,
            unit_id: null,
            unitsaleprice: null,
            currentcostprice: null
        };
        for (var i=0;i<data.length;++i) {
            var element = data[i];
            switch(element.name) {
                case 'name':
                    requestPayload.name = element.value;
                    break;
                case 'units':
                    requestPayload.unit_id = element.value;
                    break;
                case 'saleprice':
                    requestPayload.unitsaleprice = element.value;
                    break;
                case 'costprice':
                    requestPayload.currentcostprice = element.value;
                    break;
            }
        }
        callApi("POST", productSaveApiUrl, {
            'data': JSON.stringify(requestPayload)
        });
    });

    $(document).on("click", ".delete-product", function (){
        var tr = $(this).closest('tr');
        var data = {
            product_id : tr.data('id')
        };
        var isDelete = confirm("Are you sure to delete "+ tr.data('name') +" item?");
        if (isDelete) {
            callApi("POST", productDeleteApiUrl, data);
        }
    });

    productModal.on('hide.bs.modal', function(){
        $("#id").val('0');
        $("#name, #unit, #saleprice, #costprice").val('');
        productModal.find('.modal-title').text('Add New Product');
    });

    productModal.on('show.bs.modal', function(){
        //JSON data by API call
        $.get(unitListApiUrl, function (response) {
            if(response) {
                var options = '<option value="">--Select--</option>';
                $.each(response, function(index, unit) {
                    options += '<option value="'+ unit.unit_id +'">'+ unit.unitname +'</option>';
                });
                $("#units").empty().html(options);
            }
        });
    });