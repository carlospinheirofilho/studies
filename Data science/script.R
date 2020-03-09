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
hist(na.omit(renda_m_informal[renda_m_informal < 1000]))
 hist(na.omit(renda_m_informal))
 renda_m_informal_s_na <- na.omit(renda_m_informal)
 bench <- 1159.0 + 1.5*IQR(renda_m_informal_s_na)
#Calda para direita.Com problemas de outliers. 

summary(df$Dependentes)
#Maior parte não possui dependentes

table(df$Estado.Civil)
# A maior parte é solteiro ou casado.

escolaridade <- df$Escolaridade
escolaridade[is.na(escolaridade) == TRUE] <- 0

renda_m_informal <- df$Renda.Mensal.Informal

dependente <- df$Dependentes
estado_civil <- df$Estado.Civil
idade <- df$Idade
summary(idade)

conta_poupanca <- df$Conta.Poupanca
quantidade_drendas <- df$Qtd.Fonte.Renda
conta_salario <- df$Conta.Salario
quantidade_adiantamentos <- df$Quant.Adiantamento.Deposito
cheque <- df$Cheque.Sem.Fundo
conta_cojun <- df$Conta.Conjunta
valor_emprestimo <- df$Valor.Emprestimo
multa <- df$Multa
juros <- df$Juros
emprestimo_atual <- df$Valor.Emprestimo.Atualizado
estado <- df$Estado
gnr <- df$Genero
pago <- df$PAGO

type <- lm(pago ~ dependente + estado_civil + idade + conta_poupanca + cheque + valor_emprestimo + multa + juros + emprestimo_atual + conta_cojun, data = df)

#lembrar de utilizar bench