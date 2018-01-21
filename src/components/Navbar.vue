<template>
    <nav class="navbar " role="navigation" aria-label="main navigation">
        <div class="navbar-brand">
            <router-link :to="{ name: 'Admin' }" class="navbar-item">
                <i class="fas fa-chart-pie"></i>&nbsp;
                Polli
            </router-link>
        </div>
        <div class="navbar-menu">
            <div class="navbar-end">
                <div class="navbar-item">
                    <div class="field is-grouped">
                        <p class="control">
                            <router-link :to="{ name: 'Admin' }">Admin</router-link>
                        </p>
                        <p class="control">
                            <router-link :to="{ name: 'NewPoll' }">New Poll</router-link>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    </nav>
</template>

<script>
export default {
  name: 'Navbar'
}
</script>
