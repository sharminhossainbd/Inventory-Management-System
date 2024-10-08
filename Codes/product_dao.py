#Connecting with Database


from sql_connection import get_sql_connection

#Connecting with multiple tables

def get_all_products(connection):
    cursor = connection.cursor()
    query = ("Select product.product_id,product.name,unit.unitname,product.unitsaleprice,product.currentcostprice from product  Inner join unit  on product.unit_id=unit.unit_id")
    #query = ("Select product.product_id,product.name,product.unitsaleprice,product.currentcostprice from product")
    cursor.execute(query)
    response = []
    for (product_id,name,unitname,unitsaleprice,currentcostprice) in cursor:
        response.append({
            'product_id': product_id,
            'name': name,
            'unitname': unitname,
            'unitsaleprice': unitsaleprice,
            'currentcostprice': currentcostprice
        })
        '''
    for (product_id,name,unitsaleprice,currentcostprice) in cursor:
        response.append({
            'product_id': product_id,
            'name': name,
            'unitsaleprice': unitsaleprice,
            'currentcostprice': currentcostprice
        })'''
    return response

#Insert Module Creation

def insert_new_product(connection, product):
    cursor = connection.cursor()
    query = ("INSERT INTO product "
             "(name, unit_id, unitsaleprice,currentcostprice)"
             "VALUES (%s, %s, %s, %s)")
    data = (product['name'], product['unit_id'], product['unitsaleprice'],product['currentcostprice'])

    cursor.execute(query, data)
    connection.commit()

    return cursor.lastrowid

#Delete Module Creation

def delete_product(connection, product_id):
    cursor = connection.cursor()
    query = ("DELETE FROM product where product_id=" + str(product_id))
    cursor.execute(query)
    connection.commit()
    return cursor.lastrowid



'''
#Deleting a Product based on productid
if __name__ == '__main__':
    connection = get_sql_connection()
    # print(get_all_products(connection))
    print(delete_product(connection, 7))
'''