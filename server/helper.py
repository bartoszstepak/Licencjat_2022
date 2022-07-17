from math import *
import numpy as np
import random


def convert_request_matrix_to_numerical_matrix(req_matrix, num_of_matricies, dimention):
    final_matrix = []
    for i in range(num_of_matricies):
        final_matrix.append([])
        matrix = req_matrix[i].get("matrix")
        factor = req_matrix[i].get("factor")

        eval_factor = 0
        if (type(factor) == type("")):
            eval_factor = evaluate_string_experssions_numers(factor)
        else:
            eval_factor = factor

        row = []
        for d in range(dimention*dimention):

            if(d%dimention == 0 and d > 0):

                final_matrix[i].append(row)
                row = []

            value = matrix[d].get("value")
            if(type(value) == type("")):
                eval_value = evaluate_string_experssions_numers(value)
                final_value = eval_value * eval_factor
                row.append(final_value)
            else:
                row.append(value)

        final_matrix[i].append(row)
        row = []

    return  final_matrix;


def evaluate_string_experssions_numers(expression):
    value = 0

    try:
        value = eval(expression)
        return value
    except:
        pass

    try:
        splited_expression = list(expression)
        first_char_of_expression = splited_expression[0]
        if first_char_of_expression == 'p':
            return pow(eval(splited_expression[2]), eval(splited_expression[4]))
        elif first_char_of_expression == 's':
            return sqrt(eval(splited_expression[3]))
        elif first_char_of_expression == 'f':
            return eval(splited_expression[2])/eval(splited_expression[4])
        elif first_char_of_expression =='c':
            return complex(eval(splited_expression[2]), eval(splited_expression[4]))

    except:
        print("cannot evalute expression from string to number in evaluate_string_experssions_numers of -->", expression)
        return 0









def normalize_real_vector(vector):
    dim = len(vector)
    tmp_sum = 0

    for i in range(dim):
        tmp_sum = tmp_sum + pow(vector[i], 2)

    vector_length = sqrt(tmp_sum)
    normalized_vector = []

    if vector_length > 0:
        for i in range(dim):
            normalized_vector.append(vector[i] / vector_length)

    return np.asarray(normalized_vector)


def normalize_complex_vector(vector):
    vector_oo = vector - vector.real.min() - 1j * vector.imag.min()
    return vector_oo/np.abs(vector_oo).max()


def get_hermitian_operator(dimension=3):
    random_array = np.random.rand(dimension, dimension)
    matrix = np.asmatrix(random_array)

    conjugate_transposed_matrix = matrix.getH()
    matrices_sum = np.add(matrix, conjugate_transposed_matrix)
    matrices_sum_as_array = np.asarray(matrices_sum)
    divided_sum = matrices_sum_as_array / 2

    return divided_sum


def get_fibonacci_sphere_as_vectors(samples=1):
    points = []
    phi = pi * (3. - sqrt(5.))

    for i in range(samples):

        # y = 1 - (i / float(samples - 1)) * 2
        # theta = phi * i
        # x = cos(theta) * 1
        # z = sin(theta) * 1

        x = random.randrange(-100,100)
        y = random.randrange(-100,100)
        z = random.randrange(-100,100)
        vector = (x, y, z)

        if len(vector) == 3:
            points.append(vector)

    return points