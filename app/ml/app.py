# from flask import Flask, request, jsonify
# from flask_cors import CORS

# import joblib

# # Load trained model and encoders
# model = joblib.load('feedback_strength_weakness_model.pkl')
# strength_encoder = joblib.load('strength_encoder.pkl')
# weakness_encoder = joblib.load('weakness_encoder.pkl')

# app = Flask(__name__)
# CORS(app) 

# @app.route('/')
# def home():
#     return "Mock Interview Feedback API is running."

# @app.route('/predict', methods=['POST'])
# def predict():
#     data = request.get_json()

#     if not data or 'feedback' not in data:
#         return jsonify({"error": "Missing 'feedback' in request"}), 400

#     feedback = data['feedback']

#     # Ensure it's a list for model input
#     feedback_list = [feedback]

#     # Use predict_proba to apply threshold
#     probs = model.predict_proba(feedback_list)
#     threshold = 0.1  # lower threshold helps catch subtle weaknesses

#     pred = np.array([p[:, 1] >= threshold for p in probs]).T.astype(int)

#     n_strength = len(strength_encoder.classes_)
#     pred_strength = pred[:, :n_strength]
#     pred_weakness = pred[:, n_strength:]

#     strengths = strength_encoder.inverse_transform(pred_strength)
#     weaknesses = weakness_encoder.inverse_transform(pred_weakness)

#     return jsonify({
#         "feedback": feedback,
#         "predicted_strengths": strengths[0],
#         "predicted_weaknesses": weaknesses[0] if weaknesses[0] else []
#     })


    

# if __name__ == '__main__':
#     app.run(debug=True)


from flask import Flask, request, jsonify
from flask_cors import CORS
import joblib
import numpy as np  # ✅ FIXED MISSING IMPORT

# Load trained model and encoders
model = joblib.load('feedback_strength_weakness_model.pkl')
strength_encoder = joblib.load('strength_encoder.pkl')
weakness_encoder = joblib.load('weakness_encoder.pkl')

app = Flask(__name__)
CORS(app)

@app.route('/')
def home():
    return "Mock Interview Feedback API is running."

@app.route('/predict', methods=['POST'])
def predict():
    data = request.get_json()

    if not data or 'feedback' not in data:
        return jsonify({"error": "Missing 'feedback' in request"}), 400

    feedback = data['feedback']
    feedback_list = [feedback]

    # Predict probabilities
    probs = model.predict_proba(feedback_list)
    threshold = 0.1

    pred = np.array([p[:, 1] >= threshold for p in probs]).T.astype(int)

    n_strength = len(strength_encoder.classes_)
    pred_strength = pred[:, :n_strength]
    pred_weakness = pred[:, n_strength:]

    # strengths = strength_encoder.inverse_transform(pred_strength)
    # weaknesses = weakness_encoder.inverse_transform(pred_weakness)

    
    # Decode
    print("Predicted Strengths:", strength_encoder.inverse_transform(pred_strength))
    print("Predicted Weaknesses:", weakness_encoder.inverse_transform(pred_weakness))

    predicted_strengths_list = list(strength_encoder.inverse_transform(pred_strength)[0])
    predicted_weaknesses_list = list(weakness_encoder.inverse_transform(pred_weakness)[0])

    return jsonify({
        "feedback": feedback,
        "predicted_strengths": predicted_strengths_list,
        "predicted_weaknesses": predicted_weaknesses_list
    })
    # return jsonify({
    #     "feedback": feedback,
    #     "predicted_strengths": strengths[0] if isinstance(strengths, tuple) and len(strengths) > 0 and strengths[0] else [],
    #     "predicted_weaknesses": weaknesses[0] if isinstance(weaknesses, tuple) and len(weaknesses) > 0 and weaknesses[0] else []
    # })

if __name__ == '__main__':
    app.run(debug=True)
