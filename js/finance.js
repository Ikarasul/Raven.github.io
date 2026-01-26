

(function () {
    'use strict';


    const STORAGE_KEY = 'raven_finance';


    const getTransactions = () => JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');
    const saveTransactions = (data) => localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    const numberWithCommas = (x) => x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");



    window.RavenFinance = {
        data: getTransactions(),

        addTransaction: function (text, amount, isIncome) {

            if (!text || isNaN(amount)) return false;

            const finalAmount = isIncome ? Math.abs(amount) : -Math.abs(amount);
            const transaction = {
                id: Math.floor(Math.random() * 100000000),
                text: text,
                amount: finalAmount,
                date: new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'short' })
            };

            this.data.push(transaction);
            saveTransactions(this.data);
            this.notify();
            return transaction;
        },

        removeTransaction: function (id) {
            this.data = this.data.filter(t => t.id !== id);
            saveTransactions(this.data);
            this.notify();
        },

        clearData: function () {
            this.data = [];
            saveTransactions([]);
            this.notify();
        },

        getSummary: function () {
            const amounts = this.data.map(t => t.amount);
            const total = amounts.reduce((acc, item) => (acc += item), 0);
            const income = amounts.filter(item => item > 0).reduce((acc, item) => (acc += item), 0);
            const expense = (amounts.filter(item => item < 0).reduce((acc, item) => (acc += item), 0) * -1);

            return {
                total: total.toFixed(2),
                income: income.toFixed(2),
                expense: expense.toFixed(2),
                formatted: {
                    total: numberWithCommas(total.toFixed(2)),
                    income: '+' + numberWithCommas(income.toFixed(2)),
                    expense: '-' + numberWithCommas(expense.toFixed(2))
                }
            };
        },

        notify: function () {

            this.data = getTransactions();
            const event = new CustomEvent('raven-finance-update', {
                detail: { summary: this.getSummary(), transactions: this.data }
            });
            window.dispatchEvent(event);
        },


        reload: function () {
            this.data = getTransactions();
            this.notify();
        }
    };


    window.addEventListener('storage', (e) => {
        if (e.key === STORAGE_KEY) {
            window.RavenFinance.reload();
        }
    });

})();


window.addIncome = (amount, label) => window.RavenFinance.addTransaction(label, amount, true);
window.addExpense = (amount, label) => window.RavenFinance.addTransaction(label, amount, false);
