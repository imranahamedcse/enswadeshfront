<template lang="">
    <div>
        <div class="flex items-center justify-center text-2xl">
            <div id="calculator">
                <div id="result">
                    <span>{{ valueDisplayed.toFixed(2) }}</span>
                </div>
                <div id="pad">
                    <div class="btn-cal" id="clear" @click="clear">C</div>
                    <div class="btn-cal" @click="handleOp('/')">/</div>
                    <div class="btn-cal" @click="handleDigit(7)">7</div>
                    <div class="btn-cal" @click="handleDigit(8)">8</div>
                    <div class="btn-cal" @click="handleDigit(9)">9</div>
                    <div class="btn-cal" @click="handleOp('x')">x</div>
                    <div class="btn-cal" @click="handleDigit(4)">4</div>
                    <div class="btn-cal" @click="handleDigit(5)">5</div>
                    <div class="btn-cal" @click="handleDigit(6)">6</div>
                    <div class="btn-cal" @click="handleOp('-')">-</div>
                    <div class="btn-cal" @click="handleDigit(1)">1</div>
                    <div class="btn-cal" @click="handleDigit(2)">2</div>
                    <div class="btn-cal" @click="handleDigit(3)">3</div>
                    <div class="btn-cal" @click="handleOp('+')">+</div>
                    <div id="zero" class="btn-cal" @click="handleDigit(0)">0</div>
                    <div id="equal" class="btn-cal" @click="handleOp('=')">=</div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    data () {
        return {
            currentValue: 0,
            savedValue: false,
            currentOp: false
        }
    },
    methods: {
        clear () {
            this.currentValue = 0
            this.savedValue = false
            this.currentOp = false
        },
        handleDigit (digit) {
            if (this.currentOp === '=') {
                this.savedValue = false
        }
        this.currentValue = this.currentValue * 10 + digit
        },
        handleOp (op){
            if (this.currentOp) {
                this.process()
        }
        else {
            this.savedValue = this.currentValue
        }
        this.currentValue = 0
        this.currentOp = op      
        },
        process() {
            if (this.currentOp === '+') {
                this.savedValue += this.currentValue
        }
        else if (this.currentOp === '-') {
            this.savedValue -= this.currentValue
        }
        else if (this.currentOp === 'x') {
            this.savedValue *= this.currentValue
        }
        else if (this.currentOp === '/') {
            this.savedValue /= this.currentValue
        }
        else if (this.currentOp === '=' && this.currentValue) {
            this.savedValue = this.currentValue
        }
        this.currentValue = 0
        this.currentOp = false
        }
    },
    computed: {
        valueDisplayed () {
        return this.savedValue ? 
            this.currentValue ? 
            this.currentValue : this.savedValue
            : this.currentValue
        }
    }
}
</script>