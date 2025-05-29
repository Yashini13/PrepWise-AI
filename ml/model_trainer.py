# import json
# import pandas as pd
# from sklearn.model_selection import train_test_split
# from sklearn.multioutput import MultiOutputClassifier
# from sklearn.feature_extraction.text import TfidfVectorizer
# from sklearn.linear_model import LogisticRegression
# from sklearn.preprocessing import MultiLabelBinarizer
# from sklearn.pipeline import Pipeline
# from sklearn.metrics import classification_report

# # Load the dataset
# with open('mock_interview_feedback_dataset.json', 'r') as f:
#     data = json.load(f)

# # Convert to DataFrame
# df = pd.DataFrame(data)

# # Use MultiLabelBinarizer for strengths and weaknesses
# strength_encoder = MultiLabelBinarizer()
# weakness_encoder = MultiLabelBinarizer()

# y_strength = strength_encoder.fit_transform(df['strengths'])
# y_weakness = weakness_encoder.fit_transform(df['weaknesses'])

# # Combine both as a multi-output target
# X = df['feedback']
# Y = pd.concat([pd.DataFrame(y_strength), pd.DataFrame(y_weakness)], axis=1)

# # Split data
# X_train, X_test, y_train, y_test = train_test_split(X, Y, test_size=0.2, random_state=42)

# # Create TF-IDF + MultiOutputClassifier pipeline
# pipeline = Pipeline([
#     ('tfidf', TfidfVectorizer()),
#     ('clf', MultiOutputClassifier(LogisticRegression(max_iter=1000)))
# ])

# # Train
# pipeline.fit(X_train, y_train)

# # Evaluate
# y_pred = pipeline.predict(X_test)
# print(classification_report(y_test, y_pred))

# import joblib

# joblib.dump(pipeline, 'feedback_strength_weakness_model.pkl')
# joblib.dump(strength_encoder, 'strength_encoder.pkl')
# joblib.dump(weakness_encoder, 'weakness_encoder.pkl')


# # Load model and encoders
# model = joblib.load('feedback_strength_weakness_model.pkl')
# strength_encoder = joblib.load('strength_encoder.pkl')
# weakness_encoder = joblib.load('weakness_encoder.pkl')

# # Predict new feedback
# new_feedback = ["Excellent communication but lacks DSA depth."]
# pred = model.predict(new_feedback)

# # Split prediction into strengths and weaknesses
# n_strengths = len(strength_encoder.classes_)
# pred_strength = pred[:, :n_strengths]
# pred_weakness = pred[:, n_strengths:]

# print("Predicted Strengths:", strength_encoder.inverse_transform(pred_strength))
# print("Predicted Weaknesses:", weakness_encoder.inverse_transform(pred_weakness))

import json
import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn.multioutput import MultiOutputClassifier
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.linear_model import LogisticRegression
from sklearn.preprocessing import MultiLabelBinarizer
from sklearn.pipeline import Pipeline
from sklearn.metrics import classification_report

# Load the dataset
with open('mock_interview_feedback_dataset.json', 'r') as f:
    data = json.load(f)

# Convert to DataFrame
df = pd.DataFrame(data)

# Use MultiLabelBinarizer for strengths and weaknesses
strength_encoder = MultiLabelBinarizer()
weakness_encoder = MultiLabelBinarizer()

y_strength = strength_encoder.fit_transform(df['strengths'])
y_weakness = weakness_encoder.fit_transform(df['weaknesses'])

# Combine both as a multi-output target
X = df['feedback']
Y = pd.concat([pd.DataFrame(y_strength), pd.DataFrame(y_weakness)], axis=1)

# Split data
X_train, X_test, y_train, y_test = train_test_split(X, Y, test_size=0.2, random_state=42)

# Create TF-IDF + MultiOutputClassifier pipeline
pipeline = Pipeline([
    ('tfidf', TfidfVectorizer()),
    ('clf', MultiOutputClassifier(LogisticRegression(max_iter=1000)))
])

# Train
pipeline.fit(X_train, y_train)

# Evaluate
y_pred = pipeline.predict(X_test)
print(classification_report(y_test, y_pred))

import joblib

joblib.dump(pipeline, 'feedback_strength_weakness_model.pkl')
joblib.dump(strength_encoder, 'strength_encoder.pkl')
joblib.dump(weakness_encoder, 'weakness_encoder.pkl')


# Load model and encoders
model = joblib.load('feedback_strength_weakness_model.pkl')
strength_encoder = joblib.load('strength_encoder.pkl')
weakness_encoder = joblib.load('weakness_encoder.pkl')

# Predict new feedback
new_feedback = ["Excellent communication but lacks DSA depth."]
pred = model.predict(new_feedback)

# Split prediction into strengths and weaknesses
n_strengths = len(strength_encoder.classes_)
pred_strength = pred[:, :n_strengths]
pred_weakness = pred[:, n_strengths:]

print("Predicted Strengths:", strength_encoder.inverse_transform(pred_strength))
print("Predicted Weaknesses:", weakness_encoder.inverse_transform(pred_weakness))
