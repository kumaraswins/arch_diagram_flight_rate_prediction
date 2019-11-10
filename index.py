
import pandas as pd
import numpy as np
from scipy import stats
from datetime import datetime
from sklearn import preprocessing
from sklearn.model_selection import KFold
from sklearn.linear_model import LinearRegression
from sklearn.model_selection import train_test_split 

class FlightPrediction():
    """[Constructor function loads the data set from the csv file]
    Filters the required data 
    Reads the first 1000 data
    """
    def __init__(self):
        self.CSV_FILE = 'sha-pek.csv'
        self.COLUMNS =  ["departureDate","price",'priceClass','arrivalDate','rate']
        self.nRowsRead = None # specify 'None' if want to read whole file
        self.dataFrame = pd.read_csv( self.CSV_FILE  , delimiter=',', nrows = self.nRowsRead,na_filter=True).fillna(value = "missing")
        self.data_conversion()

    def number_of_data(self):
        nRow, nCol = self.dataFrame.shape
        #print('There are '+str(nRow)+' rows and '+str(nCol)+' columns')
        #print("Head data \n",self.dataFrame.head(5))

    def data_conversion(self):
        self.dataFrame['departureDate'] = pd.to_datetime(self.dataFrame['departureDate'])
        self.dataFrame['arrivalDate'] = pd.to_datetime(self.dataFrame['arrivalDate'])
        self.dataFrame['createDate'] = pd.to_datetime(self.dataFrame['createDate'])
        self.dataFrame['rate'] = pd.to_numeric(self.dataFrame['rate'], errors='coerce')
        self.number_of_data()


    # Checks the data is clean, if there are any empty fields in the data
    def check_for_null(self):
        return self.dataFrame.isnull().values.any()
    
    """[Preparing the X and y data for training test and prediction]
    """
    def prepare_data(self):
        dt = self.dataFrame['departureDate'].values
        dt = dt.astype('datetime64[D]').astype(int)
        self.X = dt.reshape(-1,1)
        self.y = self.dataFrame['price'].values.reshape(-1,1)
        self.X_train, self.X_test, self.y_train, self.y_test = train_test_split(self.X, self.y, test_size=0.2, random_state=0)
        return 'No of rows selected '+str(self.nRowsRead)+'. Trained with  '+str(len(self.X_train))+' data and test data is : '+ str(len(self.X_test))
    
    """[Trains and fit the data using Linear regrssion, scikit learn]
    """
    def train_data_predict(self):
        self.regressor = LinearRegression()  
        self.regressor.fit(self.X_train, self.y_train)
        self.y_pred = self.regressor.predict(self.X_train)
        #print("Train and fit data")
        #print(self.y_pred)
    
    """[fit_given_data ]
    """
    def fit_given_data(self, given_date):
        print("given list",given_date)
        self.input_data = {"departureDate": given_date}
        self.dt_test_list = self.input_data
        self.df_test = pd.DataFrame(self.dt_test_list) 
        self.df_test['departureDate'] = pd.to_datetime(self.df_test['departureDate'])
        self.dftest_dt = self.df_test['departureDate'].values.reshape(-1,1)
        self.dftest_dt = self.dftest_dt.astype('datetime64[D]').astype(int)

    """[Predict the flight rate for the given date]
    """
    def predict_final(self):
        predicted_list = self.regressor.predict(self.dftest_dt)
        return np.array(predicted_list).tolist()


if __name__ == "__main__":
    fp =  FlightPrediction()
    if (fp.check_for_null() == False):
        print("There are no null values in the data \n")
    else:
        print("Fill the null data")
    print(fp.prepare_data()+"\n")
    fp.train_data_predict()
    #fp.fit_given_data("2019-07-16 19:55:00")
    input_list = ["2019-05-01T07:00:00.000000000", "2019-05-01T11:45:00.000000000", "2019-05-01T11:45:00.000000000", "2019-05-01T11:55:00.000000000", "2019-05-01T11:55:00.000000000"]
    fp.fit_given_data(input_list)
    print("Final prediction for the given dates \n")
    print(fp.predict_final())