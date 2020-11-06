

// TODO =======>  NOTES for evaluator <=======
/* 
** Console.error can be replaced with a throw new Error(some msg) 
** BracketList can be separated on a different file
** I generally return a value desired for the function. I assumed it will be a true or false and not only a msg. I could also be the string.
** In case of optimization, we can change reduce with a for loop, but will add more code
** Depending on time and situation, I will add conditional for the function to leave an error. New functions are propense to refactor
** Finally, Since it's a practical evaluation, I did not add a commented description on what de function does (e.g. args bracketStr <String>)
 */

const isBracketStrBalanced = bracketStr => {
    if (typeof bracketStr !== "string" || bracketStr.length <= 0) {
        console.error('Please provide a ony bracket string (e.g. "({})")')
        return false
    }

    // TODO It will be ideal to separate this in another file, but for practical purposes and time, I will leave it here
    const bracketList = [
        { open: '(', close: ')' },
        { open: '{', close: '}' },
        { open: '[', close: ']' },
    ]


    // Extract all bracket values for argument evaluation
    const strAcceptanceCriteria = bracketList.flatMap(obj => Object.values(obj)).join('') // We can also use .reduce()
    const isNotAccepted = bracketStr.split('').some(c => !strAcceptanceCriteria.includes(c))

    // If string is not a bracket, throws console.log and returns
    if (isNotAccepted) {
        console.error('Please provide a ony bracket string (e.g. "({})")')
        return false
    }

    const stack = []
    for (let i = 0; i < bracketStr.length; i++) {
        const char = bracketStr[i];

        // If it's an open bracket, adds it to stack
        const inBracketList = bracketList.find(({ open }) => open === char)
        if (inBracketList) {
            stack.push(char)
            continue
        }

        // If it's a close bracket, pops the stack and obtains char
        const popChar = stack.pop()
        // Find the popped char on bracket list
        const foundBracket = bracketList.find(({ open }) => open === popChar)
        // If not found or is not the counter part of the open char, throws error and returns 
        if (!foundBracket || foundBracket.close !== char) {
            console.error('Is not balanced')
            return false
        }
    }

    // If everythig was popped, it is balanced
    if (stack.length <= 0) {
        console.log('Is Balanced')
        return true
    }
    // If not, not balanced
    console.error('Is not Balanced.')
    return false
}

// Try me :)
isBracketStrBalanced()