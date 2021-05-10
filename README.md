# Next.js 

## How to use

Download the example [or clone the repo](https://github.com/mui-org/material-ui):

```sh
git clone https://github.com/gakin95/todoapp.git
cd todoapp
```

Install it and run:

```sh
npm install
npm run dev
```

## Some problem encountered 

1. When you make a get request after you perform any operation to their database, they return only the items they created themselves i.e they always return 100 items no matter the operation you perform(create, delete, edit)

2. I noticed that when you sucessfully make a post request to json place holder, the id they return back is always the same, they return if of 101 all the time, this is because they don't want people to create too much data to their database.

3. Json place holder doesn't allow one to edit any item that the id is greater than 100, this is because the post request with even the id of 101 is fake. it doesn't really exist in their database so it throw an error.


## How I resolved them

1. I created a store to hold the data using redux and used redux persist to persist the data. Everytime any crud operation is performed, i update my store. Also every I mount the home screen, I check if i have data in the store, if i do, I make use of the data in the store since it is the lastest and if I don't I update my store with what is coming from json place holder

2. On every Successful post request, i check the length of the data in my store and add 1 to it. The created todo id is then given the length

3. I make a call to their edit end point if the id of the item is less than or equal to 100 and if the request is succesful, i update my store else I fake the edit by setting a time out and then go ahead to update the store


[Next.js](https://github.com/zeit/next.js) is a framework for server-rendered React apps.
