The first example that crossed my mind was to check by condition ‘if’. 
If the value is less than 0 then the function should return -(value). 
This will change the value to positive, otherwise return it the way it is.

The easiest solution would be comparing x and -x with JS native method Math.max(). 
It chooses the maximum value from passed variables so I just need to return it.

The same logic with using Math.min() but the opposite way. 
The min function should return the smallest value, which would be negative. 
Before returning the negative number it has to be converted to -(value).

Another 2 ways are with converting the value to string:

If the first character is '-' (will find by index[0]) return -(value).

Or convert the string to an array. If the first character is ‘-’ then remove the first character 
using shift() method and then join by empty string and then convert to a number. 
This one is the worst solution in terms of time complexity.

To avoid some edge cases each solution needs to be wrapped in a type check. 
If the value passed in our custom abs method is not a number, return NaN. 
When using Math.min and Math.max the best is first to check if the value is -0 just return 0 before any comparison.