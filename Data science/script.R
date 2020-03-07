df <- read.csv('elogroup/df_emprestimos_banco.csv')

#Muitas variaveis com espaços vazios.

#Escolaridade

table(df$Escolaridade)

length(df$Escolaridade)

(sum(is.na(df$Escolaridade))/length(df$Escolaridade)) * 100

barplot(table(df$Escolaridade))

#Muitas pessoas tem no maximo ensino medio ou não informado. 71% não informa.

hist(df$Renda.Mensal.Informal, 
           main="Histograma de Renda mensal informal", 
           xlab="Renda mensal", 
           border="blue", 
          col="green",
           xlim=c(0,5000),
           las=1, 
    )
renda_mensal <- df$Renda.Mensal.Informal[is.na(df$Renda.Mensal.Informal) != TRUE]
bench =  1159.0 + 1.5*IQR(renda_mensal)
renda_mensal[renda_mensal > bench] <- bench
#Calda para direita.Com problemas de outliers. 

summary(df$Dependentes)
#Maior parte não possui dependentes

table(df$Estado.Civil)
# A maior parte é solteiro ou casado.

