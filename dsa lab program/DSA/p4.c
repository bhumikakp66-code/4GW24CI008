#include <stdio.h> 
int main() 
{ 
 char str[100], pat[50], rep[50], result[150]; 
 int i = 0, j = 0, k = 0; 
int found = 0, match; 
 printf("Enter the main string:\n"); 
 gets(str); 
 printf("Enter the pattern string:\n"); 
 gets(pat); 
printf("Enter the replacement string:\n"); 
gets(rep); 
 int patLen = 0; 
 while (pat[patLen] != '\0') 
 patLen++; 
 while (str[i] != '\0') 
 { 
match = 1; 
 for (j = 0; pat[j] != '\0'; j++) 
 { 
if (str[i + j] != pat[j]) 
 { 
 match = 0; 
 break; 
 } 
 } 
 if (match == 1) 
 { 
 found = 1;  
for (j = 0; rep[j] != '\0'; j++) 
 { 
result[k] = rep[j]; 
 k++;
 }
i = i + patLen; 
 } 
 else 
 { 
 result[k] = str[i]; 
i++; 
k++; 
 } 
} 
result[k] = '\0'; 
 if (found == 0) 
printf("No matching string\n"); 
 else 
printf("Resultant string:\n%s\n", result); 
return 0; 
} 

 