def get_unit(connection):
    cursor = connection.cursor()
    query = ("select * from unit")
    cursor.execute(query)
    response = []
    for (unit_id, unitname) in cursor:
        response.append({
            'unit_id': unit_id,
            'unitname': unitname
        })
    return response


if __name__ == '__main__':
    from sql_connection import get_sql_connection

    connection = get_sql_connection()
    # print(get_all_products(connection))
    print(get_unit(connection))