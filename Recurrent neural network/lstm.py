import tensorflow as tf
import keras
from keras.models import Sequential
from keras.layers import Dense, Dropout, Embedding, LSTM
from keras.preprocessing.text import Tokenizer
from keras.preprocessing.sequence import pad_sequences
from keras.callbacks import EarlyStopping
import pandas as pd
import numpy as np
from sklearn.model_selection import train_test_split


def cleaning_data(filename):
    train = pd.read_csv(filename)
    train_data = train.copy()
    train_data = train_data.set_index('id', drop = True)
    print(train_data.shape)
    train_data[['title', 'author']] = train_data[['title', 'author']].fillna(value = 'Missing')
    train_data = train_data.dropna()
    length = []
    [length.append(len(str(text))) for text in train_data['text']]
    train_data['length'] = length
    print(min(train_data['length']), max(train_data['length']), round(sum(train_data['length'])/len(train_data['length'])))
    print(len(train_data[train_data['length'] < 50]))
    train_data = train_data.drop(train_data['text'][train_data['length'] < 50].index, axis = 0)
    return train_data

def pre_processing(train_data):
    tokenizer = Tokenizer(num_words = 4500, filters='!"#$%&()*+,-./:;<=>?@[\\]^_`{|}~\t\n', lower = True, split = ' ')
    tokenizer.fit_on_texts(texts = train_data['text'])
    x = tokenizer.texts_to_sequences(texts = train_data['text'])
    x = pad_sequences(sequences = x, maxlen = 4500, padding = 'pre')
    y = train_data['label'].values
    x_train, x_test, y_train, y_test = train_test_split(x, y, test_size = 0.2, random_state = 100)
    return x_train, x_test, y_train, y_test

if __name__ == "__main__":
    train_data = cleaning_data('train.csv')
    train_x, test_x, train_y, test_y = pre_processing(train_data)
    print(len(train_x), len(train_y), len(test_x), len(test_y))
    y = np.concatenate((train_y, test_y), axis = 0)
    out_size = len(set(y))

    
    model = Sequential()
    model.add(Embedding(input_dim = 4500, output_dim = 130))
    model.add(LSTM(130, dropout = 0.1, recurrent_dropout = 0.1))
    model.add(Dropout(rate = 0.2))
    model.add(Dense(130, activation= 'relu'))
    model.add(Dropout(rate = 0.2))
    model.add(Dense(out_size, activation='sigmoid'))
    model.compile(optimizer = 'adam', loss = 'sparse_categorical_crossentropy', metrics = ['acc'])
    
    cb = EarlyStopping(monitor = 'val_loss', min_delta = 0, patience = 2, verbose = 2, mode='auto')
    model.summary()
    print(train_x.shape, train_y.shape)
    historic = model.fit(train_x, train_y, validation_data=(test_x, test_y),  epochs = 1, callbacks = [cb])
    model.save('LSTM.h5')
    loss, acc = model.evaluate(test_x, test_y)

    t = "Trained model accuracy: " + str((acc*100)) + "%" + " and the loss: " + str(loss)
    print(t)
    
    
    