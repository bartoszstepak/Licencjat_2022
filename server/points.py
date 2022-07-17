import scipy.linalg as la
from math import *
import numpy as np
import helper
import random


class Points:

    # def __init__(self):
    #     self.operators = []
    #     for i in range(3):
    #         self.operators.append(helper.get_hermitian_operator())

    def __init__(self, operatos, dim):
        self.operators = operatos
        self.dim = dim


    def get_joint_numerical_range(self, sammples_count=1):
        points = helper.get_fibonacci_sphere_as_vectors(sammples_count)
        jnr_points = []
        operators = self.operators

        for i in range(len(points)):

            point = points[i]
            prim_operator = self.get_prim_operator(operators, point)

            normalized_max_eig_vector = self.get_max_eig_vector_of_matrix(prim_operator)

            x = self.get_predicted_value_of_operator(operators[0], normalized_max_eig_vector)
            y = self.get_predicted_value_of_operator(operators[1], normalized_max_eig_vector)
            z = self.get_predicted_value_of_operator(operators[2], normalized_max_eig_vector)

            jnr_points.append((x.real, y.real, z.real))

        return jnr_points


    def get_prim_operator(self,operators, point):

        dimension = len(point)

        prim_operator = np.zeros((dimension, dimension))

        for i in range(dimension):

            operator = np.asarray(operators[i])
            multiplied_operator_by_point = operator * point[i]

            if i == 0:
                prim_operator = multiplied_operator_by_point
            else:
                sum_of_multipled_operators = np.add(prim_operator, multiplied_operator_by_point)
                prim_operator = sum_of_multipled_operators

        return prim_operator


    def get_max_eig_vector_of_matrix(self, matrix):
        eigenvalues, eigenvectors = la.eigh(matrix)
        max_eig_value = eigenvalues.max()
        largest_eigenvector = eigenvectors[:, np.argmax(max_eig_value)]

        return largest_eigenvector


    def get_predicted_value_of_operator(self, operator, vector):

        sum = 0
        dimension = len(operator)
        vector = vector.flatten()

        if dimension == vector.size:

            for i in range(dimension):
                for j in range(dimension):
                    Xij = operator[i][j]
                    vi = np.conj(vector[i])
                    vj = vector[j]
                    value = np.dot(np.dot(vi, Xij), vj)
                    sum = np.add(sum, value)

            return sum
        return -1


def main():
    matrix = [
        [
            [0, 1],
            [1, 0]
        ],
        [
            [0, complex(0, -1)],
            [complex(0, 1), 0]
        ],
        [
            [1, 0],
            [0, -1]
        ]
    ]

    points = Points(matrix, 2)
    generated_points = points.get_joint_numerical_range(500)

if __name__ == '__main__':
    main()