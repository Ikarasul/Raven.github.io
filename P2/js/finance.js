// 💸 Raven Finance System (Standardized)
// Central logic for P3 and Dashboard

(function () {
    'use strict';

    // Key
    const STORAGE_KEY = 'raven_finance';

    // Helpers
    const getTransactions = () => JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');
    const saveTransactions = (data) => localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    const numberWithCommas = (x) => x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");

    // Global Object
    window.RavenFinance = {
        data: getTransactions(),

        addTransaction: function (text, amount, isIncome) {
            // Validate
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
            // Reload internal data in case of external changes
            this.data = getTransactions();
            const event = new CustomEvent('raven-finance-update', {
                detail: { summary: this.getSummary(), transactions: this.data }
            });
            window.dispatchEvent(event);
        },

        // For external scripts to force reload
        reload: function () {
            this.data = getTransactions();
            this.notify();
        }
    };

    // Auto-listen to storage events (cross-tab sync)
    window.addEventListener('storage', (e) => {
        if (e.key === STORAGE_KEY) {
            window.RavenFinance.reload();
        }
    });

})();

// Export global helper for direct chat usage if needed
window.addIncome = (amount, label) => window.RavenFinance.addTransaction(label, amount, true);
window.addExpense = (amount, label) => window.RavenFinance.addTransaction(label, amount, false);
