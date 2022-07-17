from json import dumps
from points import Points
from flask import Flask, Response, request
from flask_cors import CORS
from math import *
import json


import helper


app = Flask('server')

CORS(app)

cors =  CORS(app, resources={
    r"/*": {
        "origins" : "*"
    }
})


@app.route('/', methods=['POST'])
def get_points():

    # test daat start ********************************
    # puali_matricies = [
    #     [
    #         [0, 1],
    #         [1, 0]
    #
    #     ],
    #     [
    #         [0, complex(0, -1)],
    #         [complex(0, 1), 0]
    #
    #     ],
    #     [
    #         [1, 0],
    #         [0, -1]
    #     ]
    # ]
    #
    # matrix1 = [
    #     [
    #         [0, 0, 0],
    #         [0, 0, 0],
    #         [0, 0, 1]
    #
    #     ],
    #     [
    #         [0, 1/2, 0],
    #         [1/2, 0, 0],
    #         [0, 0, 0]
    #
    #     ],
    #     [
    #         [0, 0, 1/2],
    #         [0, 0, 0],
    #         [1/2, 0, 0]
    #     ]
    # ]
    #
    # matrix220 = [
    #     [
    #         [-1, 0, 0],
    #         [0, 0, 0],
    #         [0, 0, 1]
    #
    #     ],
    #     [
    #         [0, 1, 0],
    #         [1, 0, complex(0, 1)],
    #         [0, complex(0, -1), 0]
    #
    #     ],
    #     [
    #         [0, 0, 1 / 2],
    #         [0, 0, 0],
    #         [0, 0, 0]
    #     ]
    # ]
    #
    # matrix2 = [
    #     [
    #         [0, 0, 0, 0, 1],
    #         [0, 0, 0, 1, 0],
    #         [0, 0, 1, 0, 0],
    #         [0, 1, 0, 0, 0],
    #         [1, 0, 0, 0, 0]
    #     ],
    #     [
    #         [0, 0, 0, 0, complex(0, -1)],
    #         [0, 0, 0, complex(0, -1), 0],
    #         [0, 0, complex(0, 1), 0, 0],
    #         [0, complex(0, 1), 0, 0, 0],
    #         [complex(0, 1), 0, 0, 0, 0]
    #     ],
    #     [
    #         [1, 0, 0, 0, 0],
    #         [0, 1, 0, 0, 0],
    #         [0, 0, 1, 0, 0],
    #         [0, 0, 0, -1, 0],
    #         [0, 0, 0, 0, -1]
    #     ]
    # ]
    #
    # matrix62 = [
    #     [
    #         [1,0,0],
    #         [0,1,0],
    #         [0,0,-1]
    #     ],
    #     [
    #         [0,1/sqrt(2),0],
    #         [1/sqrt(2),0,1/sqrt(2)],
    #         [0,1/sqrt(2),0]
    #     ],
    #     [
    #         [0,complex(0, -1/sqrt(2)), 0],
    #         [complex(0, 1/sqrt(2)),0,complex(0, -1/sqrt(2))],
    #         [0,complex(0, 1/sqrt(2)),0]
    #     ]
    # ]
    #
    # matrix_e64 = [
    #     [
    #         [0,1,0],
    #         [1,0,0],
    #         [0,0,-1]
    #     ],
    #     [
    #         [0,complex(0, 1/sqrt(2)), 1],
    #         [complex(0, -1/sqrt(2)), 0, 0],
    #         [1/sqrt(2), 0, 0]
    #     ],
    #     [
    #         [1 / sqrt(2), 0, 0],
    #         [0, 1 / sqrt(2), 0],
    #         [0, 0, -1 / sqrt(2)]
    #     ]
    # ]
    #
    # matrix_e642 = [
    #     [
    #         [1, 0, 0],
    #         [0, 0, 1],
    #         [0, 1, 0]
    #
    #     ],
    #     [
    #         [0, 1, 0],
    #         [1, 0, 0],
    #         [0, 0, 1]
    #
    #     ],
    #     [
    #         [0, 0, complex(0, 1)],
    #         [0, 1, 0],
    #         [complex(0, -1), 0, 0]
    #     ]
    # ]
    #
    # matrix_e66 = [
    #     [
    #         [0, 1, 0],
    #         [1, 0, 0],
    #         [0, 0, 0]
    #
    #     ],
    #     [
    #         [1, 0, 0],
    #         [0, -1, 0],
    #         [0, 0, 1]
    #
    #     ],
    #     [
    #         [0, 0, complex(0, 1 / sqrt(2))],
    #         [0, 0, 1/sqrt(2)],
    #         [complex(0, -1 / sqrt(2)) , 1 / sqrt(2), 0]
    #     ]
    # ]
    #
    # matrix_e67 = [
    #     [
    #         [0, 0, 0],
    #         [0, 0, 1/2],
    #         [0, 1, 0]
    #
    #     ],
    #     [
    #         [0, 0, 1/2],
    #         [0, 0, 0],
    #         [1/2, 0, 0]
    # 
    #     ],
    #     [
    #         [0, 0, 0],
    #         [0, 0, 0],
    #         [0, 0, 1]
    #     ]
    # ]
    #**************************************************************
    reqMatrix = []
    reqDict = json.loads(request.data)
    m = reqDict.get("matricies")
    k = reqDict.get("k")
    n = reqDict.get("n")
    size = pow(n,2)

    m_test = helper.convert_request_matrix_to_numerical_matrix(m,k,n)

    points = Points(m_test, 2)
    generated_points = points.get_joint_numerical_range(10000)

    return Response(dumps(generated_points), mimetype='text/json')


def main():
    app.run(port=8870)


if __name__ == '__main__':
    main()