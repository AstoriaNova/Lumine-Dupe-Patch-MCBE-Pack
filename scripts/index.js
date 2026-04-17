import { world, system } from "@minecraft/server";

let recentLosses = new Map()

world.afterEvents.playerInventoryItemChange.subscribe((data) => {
    const { player, slot, beforeItemStack, itemStack } = data
    
    if (beforeItemStack && !itemStack) {
        const lossData = {
            player: player.name,
            amount: beforeItemStack.amount,
            typeId: beforeItemStack.typeId,
            beforeItemStack: beforeItemStack.clone(),
            lostSlot: slot,
            timestamp: Date.now()
        }
        recentLosses.set(player.name, lossData)
        
        system.runTimeout(() => {
            if (player.isValid && recentLosses.get(player.name) === lossData) {
                recentLosses.delete(player.name)
            }
        }, 3000)
    } 
    else if (beforeItemStack && itemStack && beforeItemStack.typeId === itemStack.typeId && itemStack.amount < beforeItemStack.amount) {
        const lostAmount = beforeItemStack.amount - itemStack.amount
        const lossData = {
            player: player.name,
            amount: lostAmount,
            typeId: beforeItemStack.typeId,
            beforeItemStack: beforeItemStack.clone(),
            lostSlot: slot,
            timestamp: Date.now()
        }
        recentLosses.set(player.name, lossData)
        
        system.runTimeout(() => {
            if (player.isValid && recentLosses.get(player.name) === lossData) {
                recentLosses.delete(player.name)
            }
        }, 3000)
    }
    
    const recentLoss = recentLosses.get(player.name)
    if (beforeItemStack && itemStack && recentLoss && recentLoss.player === player.name) {
        const gained = itemStack.amount - beforeItemStack.amount
        
        if (Date.now() - recentLoss.timestamp < 1.5 && 
            recentLoss.typeId !== itemStack.typeId && 
            gained === recentLoss.amount) {
            
            world.sendMessage(`§c------------\n§9DUPE DETECTED!\n§9Type: §gLumine Override\n§9User: §g${player.name}\n§9Lost: §g${recentLoss.amount} ${recentLoss.typeId}\n§9Gained: §g+${gained} ${itemStack.typeId}\n§c------------`)
            
            const inventory = player.getComponent('inventory')?.container
            if (inventory) {
                inventory.setItem(recentLoss.lostSlot, recentLoss.beforeItemStack.clone())
                inventory.setItem(slot, beforeItemStack.clone())
            }
            
            recentLosses.delete(player.name)
        } else if (Date.now() - recentLoss.timestamp > 5) {
            recentLosses.delete(player.name)
        }
    }
})