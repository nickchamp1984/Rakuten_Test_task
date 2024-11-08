First of all I want to thank you for very interesting task and to tell you that the whole task is very challenging.

1) Small database without primary key.
2) API with strange structure (Link to the collection is in /tests/api/api.txt)
3) And the latest stuff - web shop with random but short time of changing product position. Here I failed :( I haven't
   got a solution how to get through except of asking developers to increase the amount of time. Another big issue to get
   through is adding vs concatenation as well as misclick on radiobutton.

Hope we will discuss everything above in the near future.

As for tasks themselves. I tried to comment everywhere, but something could be missed.

First task is easy enough - to read the file and iterate with it. The main possible problem is absence of the primary
key, so here I needed to iterate every row by particular value and somehow sorting and slicing methods weren't applied.

As for second part I love to work with different APIs, but this time it was something challenging - I see such a mess structure and
inconvenience for the first time in my career. Here I found the only GET method, so tests are very simple and not very
scalable for the future. The most interesting part of this part of work was to get this list of breeds. When I
understood the response structure it became much more simple to do. If breed array is empty then I pass this name as is
and if not then iterate it. (for ... of) wasn't applied, so I used to develop some crutch.

Need to admit that due to a lot of bugs on the provided application the DOM’s elements are developed comfortably for
AQAs. Maybe it is for me, but I was able to create short and unique xPath locators in a very short time. Other problems
I described above. As for implementation. I wrote step by step workflow of the program and realized that a lot of code
could be duplicated. So I created separate methods for adding to the cart and for evaluation of the product cost. Seems that they could be improved as well.  
