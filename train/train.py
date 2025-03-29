import os
import pandas as pd
import numpy as np
import joblib
from sklearn.preprocessing import OneHotEncoder, MultiLabelBinarizer
from sklearn.ensemble import RandomForestClassifier, GradientBoostingClassifier
from sklearn.compose import ColumnTransformer
from sklearn.model_selection import train_test_split, cross_val_score
from sklearn.metrics import accuracy_score
from hyperopt import fmin, tpe, hp, Trials, STATUS_OK

os.makedirs("models", exist_ok=True)

data_path = os.path.join("data", "responses.xlsx")
data = pd.read_excel(data_path)
y = data.iloc[:, 0]
X = data.iloc[:, 1:]

X_train_full, X_test_full, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=95)

wl_balance_map = {
    'სწავლა 0%, თავისუფალი დრო 100%': 0,
    'სწავლა 20%, თავისუფალი დრო 80%': 1,
    'სწავლა 40%, თავისუფალი დრო 60%': 2,
    'სწავლა 60%, თავისუფალი დრო 40%': 3,
    'სწავლა 80%, თავისუფალი დრო 20%': 4,
    'სწავლა 100%, თავისუფალი დრო 0%': 5
}

hb_mp = {
    "სპორტი": "sports",
    "ვიდეო თამაშები": "video_games",
    "ფილმები / სერიალები": "movies",
    "ანიმეები / მანგები და კომიქსები": "anime",
    "ლაშქრობა / ბუნებაში გასვლა": "hiking",
    "მეცნიერება და ტექნოლოგიები": "stem",
    "ვარჯიში": "workout",
    "მეგობრებთან ერთად გართობა": "hangout",
    "შოპინგი": "shopping"
}

def translate_hobbies(hobbies_geo: str):
    hobbies_en = [h.strip() for h in hobbies_geo.split(',')]
    return [hb_mp.get(h, h) for h in hobbies_en]

X_train_full['wl_balance'] = X_train_full['wl_balance'].map(wl_balance_map).astype(int)
X_test_full['wl_balance'] = X_test_full['wl_balance'].map(wl_balance_map).astype(int)

mlb = MultiLabelBinarizer()
X_train_full['hobbies'] = X_train_full['hobbies'].apply(translate_hobbies)
hobbies_train = pd.DataFrame(mlb.fit_transform(X_train_full['hobbies']), columns=mlb.classes_, index=X_train_full.index)
X_train_processed = X_train_full.drop('hobbies', axis=1).join(hobbies_train)

X_test_full['hobbies'] = X_test_full['hobbies'].apply(translate_hobbies)
hobbies_test = pd.DataFrame(mlb.transform(X_test_full['hobbies']), columns=mlb.classes_, index=X_test_full.index)
X_test_processed = X_test_full.drop('hobbies', axis=1).join(hobbies_test)

categorical_features = ['gender', 'which_trovert', 'dedication']
preprocessor = ColumnTransformer(
    transformers=[('cat', OneHotEncoder(), categorical_features)],
    remainder='passthrough'  # wl_balance and hobbies are already numeric
)

X_train_preprocessed = preprocessor.fit_transform(X_train_processed)
X_test_preprocessed = preprocessor.transform(X_test_processed)

def optimize_rf(params):
    model = RandomForestClassifier(
        n_estimators=int(params['n_estimators']),
        max_depth=params['max_depth'],
        min_samples_split=int(params['min_samples_split']),
        min_samples_leaf=int(params['min_samples_leaf']),
        random_state=95,
        n_jobs=-1
    )
    score = cross_val_score(model, X_train_preprocessed, y_train, cv=5, scoring='accuracy').mean()
    return {'loss': 1 - score, 'status': STATUS_OK}

def optimize_gb(params):
    model = GradientBoostingClassifier(
        n_estimators=int(params['n_estimators']),
        learning_rate=params['learning_rate'],
        max_depth=int(params['max_depth']),
        subsample=params['subsample'],
        min_samples_split=int(params['min_samples_split']),
        min_samples_leaf=int(params['min_samples_leaf']),
        random_state=95
    )
    score = cross_val_score(model, X_train_preprocessed, y_train, cv=5, scoring='accuracy').mean()
    return {'loss': 1 - score, 'status': STATUS_OK}

# Search spaces
rf_space = {
    'n_estimators': hp.quniform('n_estimators', 50, 150, 25),
    'max_depth': hp.choice('max_depth', [None, 1, 2, 3, 4, 5, 6, 7]),
    'min_samples_split': hp.quniform('min_samples_split', 2, 6, 1),
    'min_samples_leaf': hp.quniform('min_samples_leaf', 1, 3, 1)
}

gb_space = {
    'n_estimators': hp.quniform('n_estimators', 50, 150, 25),
    'learning_rate': hp.loguniform('learning_rate', np.log(0.01), np.log(0.2)),
    'max_depth': hp.quniform('max_depth', 2, 5, 1),
    'subsample': hp.uniform('subsample', 0.7, 1.0),
    'min_samples_split': hp.quniform('min_samples_split', 2, 6, 1),
    'min_samples_leaf': hp.quniform('min_samples_leaf', 1, 3, 1)
}

# Run optimization
trials_rf = Trials()
best_rf = fmin(fn=optimize_rf, space=rf_space, algo=tpe.suggest, max_evals=50, trials=trials_rf, rstate=np.random.default_rng(95))

trials_gb = Trials()
best_gb = fmin(fn=optimize_gb, space=gb_space, algo=tpe.suggest, max_evals=50, trials=trials_gb, rstate=np.random.default_rng(95))

best_rf_params = {
    'n_estimators': int(best_rf['n_estimators']),
    'max_depth': [None, 1, 2, 3, 4, 5, 6, 7][best_rf['max_depth']],
    'min_samples_split': int(best_rf['min_samples_split']),
    'min_samples_leaf': int(best_rf['min_samples_leaf']),
}

best_gb_params = {
    'n_estimators': int(best_gb['n_estimators']),
    'learning_rate': best_gb['learning_rate'],
    'max_depth': int(best_gb['max_depth']),
    'subsample': best_gb['subsample'],
    'min_samples_split': int(best_gb['min_samples_split']),
    'min_samples_leaf': int(best_gb['min_samples_leaf']),
}

best_rf_cv_acc = 1 - trials_rf.best_trial['result']['loss']
best_gb_cv_acc = 1 - trials_gb.best_trial['result']['loss']

print("\n<=== Cross-Validation Results ===>")
print(f"Random Forest Best CV Accuracy: {best_rf_cv_acc:.2%}")
print(f"Gradient Boosting Best CV Accuracy: {best_gb_cv_acc:.2%}")

final_rf = RandomForestClassifier(**best_rf_params, random_state=95)
final_gb = GradientBoostingClassifier(**best_gb_params, random_state=95)

final_rf.fit(X_train_preprocessed, y_train)
final_gb.fit(X_train_preprocessed, y_train)

y_pred_rf = final_rf.predict(X_test_preprocessed)
y_pred_gb = final_gb.predict(X_test_preprocessed)

test_acc_rf = accuracy_score(y_test, y_pred_rf)
test_acc_gb = accuracy_score(y_test, y_pred_gb)

print("\n<=== Test Set Performance ===>")
print(f"Random Forest Test Accuracy: {test_acc_rf:.2%}")
print(f"Gradient Boosting Test Accuracy: {test_acc_gb:.2%}")

joblib.dump(final_rf, "models/random_forest.joblib")
joblib.dump(final_gb, "models/gradient_boosting.joblib")
joblib.dump(preprocessor, "models/preprocessor.joblib")
joblib.dump(mlb, "models/mlb.joblib")
